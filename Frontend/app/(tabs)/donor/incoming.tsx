import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const requests = [
  {
    id: '1',
    name: 'User A',
    bloodType: 'A+',
    urgency: 'High',
    hospitalLocation: { coordinates: [77.1025, 28.7041] }, // Delhi
    createdAt: '2025-07-08T12:00:00Z',
  },
  {
    id: '2',
    name: 'User B',
    bloodType: 'B-',
    urgency: 'Medium',
    hospitalLocation: { coordinates: [77.5946, 12.9716] }, // Bangalore
    createdAt: '2025-07-09T08:30:00Z',
  },
];

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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incoming Requests</Text>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>Blood Type: {item.bloodType}</Text>
              <Text style={styles.info}>Urgency: {item.urgency}</Text>
              <Text style={styles.info}>
                Location: {item.hospitalLocation.coordinates.join(', ')}
              </Text>
              <Text style={styles.date}>Requested: {formatDate(item.createdAt)}</Text>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.acceptBtn} onPress={() => {}}>
                <Text style={styles.btnText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineBtn} onPress={() => {}}>
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
    backgroundColor: '#f8f9fa',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardLeft: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  buttonGroup: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
  },
  acceptBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  declineBtn: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
