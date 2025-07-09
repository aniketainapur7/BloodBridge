import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/auth'; // Update with your IP

export default function RegisterLoginScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [role, setRole] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('register');

  const handleSubmit = async () => {
    if (!email || !password || (mode === 'register' && (!fullName || !role || !phone || !bloodGroup))) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    try {
      let latitude: number | null = null;
      let longitude: number | null = null;

      if (mode === 'register') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required to register.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
      }

      const endpoint = mode === 'register' ? `${API_BASE_URL}/signup` : `${API_BASE_URL}/login`;

      const payload =
        mode === 'register'
          ? {
              fullName,
              email,
              phone,
              password,
              bloodType: bloodGroup,
              role,
              latitude,
              longitude
            }
          : { email, password };

      const response = await axios.post(endpoint, payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      const data = response.data;

      if (mode === 'register') {
        Alert.alert('Registration Successful', ` Welcome, ${data.fullName}! `);
      } else {
        Alert.alert('Login Successful', ` Welcome back, ${data.fullName}! `);
      }

      console.log('User profile:', data);

    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Request failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{mode === 'register' ? 'Register' : 'Login'}</Text>

      {mode === 'register' && (
        <>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            value={phone}
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />

          <Picker selectedValue={bloodGroup} onValueChange={(val) => setBloodGroup(val)} style={styles.input}>
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

          <Picker selectedValue={role} onValueChange={(val) => setRole(val)} style={styles.input}>
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Donor" value="donor" />
            <Picker.Item label="Recipient" value="recipient" />
          </Picker>
        </>
      )}

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

      <Button title={mode === 'register' ? 'Register' : 'Login'} onPress={handleSubmit} />

      <Text style={styles.toggle} onPress={() => setMode(mode === 'register' ? 'login' : 'register')}>
        {mode === 'register' ? 'Already have an account? Login' : "Don't have an account? Register"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  toggle: {
    marginTop: 20,
    color: '#000000',
    textAlign: 'center',
  },
});