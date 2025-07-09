import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";

const API_BASE_URL = "http://192.168.159.86:3001"; // ✅ Your backend IP

const BloodRequestScreen = () => {
  const [bloodType, setBloodType] = useState("");
  const [urgency, setUrgency] = useState("");
  const [hospitalLocation, setHospitalLocation] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!bloodType || !urgency || !hospitalLocation || !locationCoords) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const token = await SecureStore.getItemAsync("jwt");
      if (!token) {
        console.error("No JWT token found");
        Alert.alert("Error", "You must be logged in to submit a request.");
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/blood-request`,
        {
          bloodType,
          urgency,
          hospitalLocation: {
            lat: locationCoords.latitude,
            lng: locationCoords.longitude,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Success", "Blood request submitted successfully.");
      router.replace("./MatchingDonorsScreen");
    } catch (error) {
      console.error("API error:", error?.response?.data || error.message);
      Alert.alert("Error", "Failed to submit request.");
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocationCoords({ latitude, longitude });

      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (address) {
        const formattedAddress = `${address?.name ?? ""} ${address?.street ?? ""}, ${address?.city ?? ""}, ${address?.region ?? ""} ${address?.postalCode ?? ""}`;
        setHospitalLocation(formattedAddress.trim());
      } else {
        Alert.alert("Address not found");
      }
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert("Error", "Failed to fetch location.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>
          Blood Request Form
        </ThemedText>

        <Text style={styles.label}>Blood Group</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={bloodType}
            onValueChange={setBloodType}
            style={styles.picker}
          >
            <Picker.Item label="Select Blood Group" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
          </Picker>
        </View>

        <Text style={styles.label}>Urgency</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={urgency}
            onValueChange={setUrgency}
            style={styles.picker}
          >
            <Picker.Item label="Select Urgency" value="" />
            <Picker.Item label="High" value="High" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Low" value="Low" />
          </Picker>
        </View>

        <Text style={styles.label}>Hospital Location</Text>
        <View style={styles.locationRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter or Detect Location"
            value={hospitalLocation}
            onChangeText={setHospitalLocation}
          />
          <Button title="📍" onPress={getCurrentLocation} />
        </View>

        <Button title="Submit Request" onPress={handleSubmit} />
      </ThemedView>
    </ScrollView>
  );
};

export default BloodRequestScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    gap: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
    color: "#595959",
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    height: 54,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  picker: {
    height: Platform.OS === "ios" ? 180 : 54,
    backgroundColor: "#fff",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
});
