import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Platform, ScrollView, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';

const BloodRequestScreen = () => {
  const [bloodType, setBloodType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [hospitalLocation, setHospitalLocation] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!bloodType || !urgency || !hospitalLocation) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const requestId = `REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    Alert.alert('Success', `Request ID: ${requestId}\nDonors will be notified.`);
    router.replace('/bloodRequest/donor_matching');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>Blood Request Form</ThemedText>

        <Text style={styles.label}>Blood Group</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={bloodType} onValueChange={setBloodType} style={styles.picker}>
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
          <Picker selectedValue={urgency} onValueChange={setUrgency} style={styles.picker}>
            <Picker.Item label="Select Urgency" value="" />
            <Picker.Item label="High" value="High" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Low" value="Low" />
          </Picker>
        </View>

        <Text style={styles.label}>Hospital Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Hospital Location"
          value={hospitalLocation}
          onChangeText={setHospitalLocation}
        />

        <Button title="Submit Request" onPress={handleSubmit} />
      </ThemedView>
    </ScrollView>
  );
};

export default BloodRequestScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    gap: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  picker: {
    height: Platform.OS === 'ios' ? 180 : 50,
    backgroundColor: '#fff',
  },
});
