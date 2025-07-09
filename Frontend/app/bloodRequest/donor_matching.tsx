import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, ActivityIndicator, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import axios from 'axios'; 

type Donor = {
  id: string;
  name: string;
  distance: number;
  bloodType: string;
  location: string;
};

const DonorMatchingScreen = () => {
  const [bloodType, setBloodType] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);

  const handleSearch = async () => {
    if (!bloodType || !location) {
      alert('Please enter both blood type and location.');
      return;
    }

    try {
      setLoading(true);
      // Replace URL with your real backend endpoint
      const response = await axios.post('http://your-api.com/api/match-donors', {
        bloodType,
        location,
      });

      setDonors(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch donors. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Find Nearby Donors</ThemedText>

      <Text style={styles.label}>Blood Type</Text>
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

      <Text style={styles.label}>Your Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city or address"
        value={location}
        onChangeText={setLocation}
      />

      <Button title="Search Donors" onPress={handleSearch} />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : (
        <FlatList
          data={donors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text>Blood Type: {item.bloodType}</Text>
              <Text>Distance: {item.distance.toFixed(2)} km</Text>
              <Text>Location: {item.location}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ marginTop: 20 }}>No donors found.</Text>}
          style={{ marginTop: 20 }}
        />
      )}
    </ThemedView>
  );
};

export default DonorMatchingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 180 : 50,
    backgroundColor: '#fff',
  },
  card: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});
