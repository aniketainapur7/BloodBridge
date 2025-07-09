import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

const accepted = [
  { id: '1', name: 'User A', date: '2024-07-05' },
  { id: '2', name: 'User C', date: '2024-07-03' },
];

export default function AcceptedRequestPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accepted Requests</Text>
      <FlatList
        data={accepted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.name} - Accepted on {item.date}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  item: { padding: 10, borderBottomWidth: 1 },
});
