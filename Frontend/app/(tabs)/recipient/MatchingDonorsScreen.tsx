import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLocalSearchParams } from 'expo-router';


const API_BASE_URL = 'http://192.168.159.86:3001'; // ✅ Your backend IP

// --- Types ---
type RootStackParamList = {
  MatchingDonorsScreen: { bloodType: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'MatchingDonorsScreen'>;

type DonorProfile = {
  _id: string;
  fullName: string;
  email: string;
  bloodType: string;
};

type DonorMatch = {
  donorProfile: DonorProfile;
  distance: number;
};

// --- Component ---
const MatchingDonorsScreen: React.FC<Props> = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [donors, setDonors] = useState<DonorMatch[]>([]);
  const [error, setError] = useState('');

  const bloodType = route.params?.bloodType;

  useEffect(() => {
    const fetchMatchingDonors = async () => {
      try {
        if (!bloodType) {
          setError('No blood type provided.');
          return;
        }

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const lat = location.coords.latitude;
        const lng = location.coords.longitude;

        const token = await SecureStore.getItemAsync('jwt');
        if (!token) {
          console.error('❌ No JWT token found');
          setError('Not logged in.');
          return;
        }

        console.log('✅ Using token:', token.slice(0, 20), '...');

        const response = await axios.get<DonorMatch[]>(
          `${API_BASE_URL}/api/donors/match`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            params: {
              bloodType,
              lat,
              lng,
            },
          }
        );

        setDonors(response.data);
      } catch (err: any) {
        console.error('API error:', err?.response?.data || err.message);
        setError('Failed to fetch matching donors');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchingDonors();
  }, [bloodType]);

  const renderDonor = ({ item }: { item: DonorMatch }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.donorProfile.fullName}</Text>
      <Text>Email: {item.donorProfile.email}</Text>
      <Text>Blood Type: {item.donorProfile.bloodType}</Text>
      <Text>Distance: {item.distance} km</Text>
    </View>
  );

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nearby Matching Donors</Text>
      {donors.length === 0 ? (
        <Text style={styles.noData}>No donors found nearby</Text>
      ) : (
        <FlatList
          data={donors}
          keyExtractor={(item) => item.donorProfile._id}
          renderItem={renderDonor}
        />
      )}
    </View>
  );
};

export default function MatchingDonorsScreen1() {
  const { bloodType } = useLocalSearchParams<{ bloodType?: string }>()};


// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});