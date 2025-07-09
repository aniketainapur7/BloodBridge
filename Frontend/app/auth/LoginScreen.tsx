import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useAuth } from '../../utils/authContext';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'http://192.168.159.86:3001/api/auth'; // use 192.168.x.x:3001 on real device

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      // Step 1: Login and get token
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const { token } = response.data;

      // Step 2: Save token securely
      await SecureStore.setItemAsync('jwt', token); // ✅ Correct method

      // Step 3: Fetch profile using token
      const profileResponse = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const user = profileResponse.data;
      login(user); // Save user in context (optional)

      // Step 4: Role-based redirect
      const role = user.role;
      if (role === 'donor') {
        router.replace('/(tabs)/donor');
      } else if (role === 'recipient') {
        router.replace('/(tabs)/recipient');
      } else {
        Alert.alert("Login Failed", "Invalid role found.");
      }

    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);

      if (error.response?.status === 401 || error.response?.status === 404) {
        Alert.alert(
          'User Not Found',
          'This user is not registered. Would you like to register?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Register', onPress: () => router.push('/auth/RegisterScreen') }
          ]
        );
      } else {
        Alert.alert('Error', error.response?.data?.message || 'Login failed.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

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

      <Button title="Login" onPress={handleLogin} />

      {/* Register Link */}
      <TouchableOpacity onPress={() => router.push('/auth/RegisterScreen')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#FFFFFF' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#000' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
    color: '#000'
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
    textDecorationLine: 'underline'
  },
});
