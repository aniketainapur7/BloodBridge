import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const dummyHistory = [
  {
    id: '1',
    bloodType: 'A+',
    urgency: 'High',
    hospitalLocation: { coordinates: [72.8777, 19.0760] },
    status: 'accepted',
    acceptedBy: { name: 'John Doe' },
    createdAt: '2025-07-09T10:00:00Z',
  },
  {
    id: '2',
    bloodType: 'B-',
    urgency: 'Medium',
    hospitalLocation: { coordinates: [73.8567, 18.5204] },
    status: 'pending',
    acceptedBy: null,
    createdAt: '2025-07-08T14:00:00Z',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#6c757d';
    case 'accepted':
      return '#28a745';
    case 'cancelled':
      return '#dc3545';
    default:
      return '#000';
  }
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export default function RequestHistoryPage() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Your Request History</ThemedText>

      <FlatList
        data={dummyHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.bloodType}>{item.bloodType}</Text>
              <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>

            <Text style={styles.info}>Urgency: {item.urgency}</Text>
            <Text style={styles.info}>
              Location: {item.hospitalLocation?.coordinates?.join(', ') || 'Unknown'}
            </Text>
            {item.acceptedBy ? (
              <Text style={styles.info}>Matched Donor: {item.acceptedBy.name}</Text>
            ) : (
              <Text style={styles.info}>Matched Donor: Not yet assigned</Text>
            )}
            <Text style={styles.date}>Requested on: {formatDate(item.createdAt)}</Text>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#595959'
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  bloodType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  info: {
    fontSize: 14,
    marginBottom: 2,
    color: '#333',
  },
  date: {
    fontSize: 12,
    marginTop: 6,
    color: '#555',
  },
});
