"use client"

import { useState } from "react"
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"
import * as Location from "expo-location"
import axios from "axios"
import { useRouter } from "expo-router"

const API_BASE_URL = "http://192.168.159.86:3001/api/auth"

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [bloodGroup, setBloodGroup] = useState("")
  const [role, setRole] = useState("")
  const router = useRouter()

  const handleRegister = async () => {
    if (!email || !password || !fullName || !role || !phone || !bloodGroup) {
      Alert.alert("Error", "Please fill all required fields.")
      return
    }

    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to register.")
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      const { latitude, longitude } = location.coords

      const payload = {
        fullName,
        email,
        phonenumber: phone,     // ✅ Corrected field name
        password,
        bloodType: bloodGroup,
        role,
        latitude,
        longitude,
      }


      const response = await axios.post(`${API_BASE_URL}/signup`, payload, {
        headers: { "Content-Type": "application/json" },
      })

      Alert.alert("Registration Successful");

setTimeout(() => {
  if (role === "donor") {
    router.replace("/(tabs)/donor");
  } else if (role === "recipient") {
    router.replace("/(tabs)/recipient");
  }
}, 300); // Wait 300ms for alert to close

    } catch (error: any) {
      console.error("Registration error:", error.response?.data || error.message)
      Alert.alert("Error", error.response?.data?.message || "Request failed.")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>

      <TextInput placeholder="Full Name" style={styles.input} value={fullName} onChangeText={setFullName} />

      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />

      <Picker selectedValue={bloodGroup} onValueChange={setBloodGroup} style={styles.input}>
        <Picker.Item label="Select Blood Group" value="" />
        <Picker.Item label="A+" value="AP" />
        <Picker.Item label="A−" value="AN" />
        <Picker.Item label="B+" value="BP" />
        <Picker.Item label="B−" value="BN" />
        <Picker.Item label="AB+" value="ABP" />
        <Picker.Item label="AB−" value="ABN" />
        <Picker.Item label="O+" value="OP" />
        <Picker.Item label="O−" value="ON" />
      </Picker>

      <Picker selectedValue={role} onValueChange={setRole} style={styles.input}>
        <Picker.Item label="Select Role" value="" />
        <Picker.Item label="Donor" value="donor" />
        <Picker.Item label="Recipient" value="recipient" />
      </Picker>

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
    color: "#000",
  },
})
