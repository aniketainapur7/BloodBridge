import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });

      Alert.alert('Login Successful', `Welcome back, ${response.data.fullName}!`);
      console.log('User profile:', response.data);
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>

      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#FFFFFF' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15, backgroundColor: '#FFF', color: '#000' },
});
