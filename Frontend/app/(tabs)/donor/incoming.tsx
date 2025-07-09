import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import axios from 'axios';


const API_URL = 'http://192.168.159.86:3001/api/incoming';

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function IncomingRequestPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(API_URL);
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
        Alert.alert("Error", "Unable to fetch requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = (item: any) => {
    const coords = item?.hospitalLocation?.coordinates || [];
    if (coords.length === 2) {
      const [lng, lat] = coords;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      Linking.openURL(url);
    } else {
      Alert.alert("Invalid location", "Location coordinates not found.");
    }
  };

  const handleDecline = (item: any) => {
    Alert.alert("Declined", `You have declined the request from ${item.name}`);
    // TODO: Add backend call to update request status if needed
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incoming Requests</Text>

      <FlatList
        data={requests}
        keyExtractor={(item) => item._id || item.id || Math.random().toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>Blood Type: {item.bloodType}</Text>
              <Text style={styles.info}>Urgency: {item.urgency}</Text>
              <Text style={styles.info}>
                Location: {item.hospitalLocation?.coordinates?.join(', ') || 'N/A'}
              </Text>
              <Text style={styles.date}>Requested: {formatDate(item.createdAt)}</Text>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.acceptBtn} onPress={() => handleAccept(item)}>
                <Text style={styles.btnText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineBtn} onPress={() => handleDecline(item)}>
                <Text style={styles.btnText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  cardLeft: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  declineBtn: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
