import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import React from 'react';

const requests = [
  { id: '1', name: 'User A', location: 'Delhi' },
  { id: '2', name: 'User B', location: 'Bangalore' },
];

export default function IncomingRequestPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incoming Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name} - {item.location}</Text>
            <Button title="Accept" onPress={() => {}} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  card: { padding: 10, borderBottomWidth: 1 },
});
