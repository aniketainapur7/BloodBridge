import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export default function RequestPage() {
  const [bloodType, setBloodType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [location, setLocation] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blood Request</Text>
      <TextInput placeholder="Blood Type" value={bloodType} onChangeText={setBloodType} style={styles.input} />
      <TextInput placeholder="Urgency (Low / Medium / High)" value={urgency} onChangeText={setUrgency} style={styles.input} />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
      <Button title="Send Request" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
});
