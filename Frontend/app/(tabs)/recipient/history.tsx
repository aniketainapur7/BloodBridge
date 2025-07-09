import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

const dummyHistory = [
  { id: '1', type: 'A+', urgency: 'High', location: 'Mumbai' },
  { id: '2', type: 'B-', urgency: 'Medium', location: 'Pune' },
];

export default function RequestHistoryPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request History</Text>
      <FlatList
        data={dummyHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.type} | {item.urgency} | {item.location}</Text>
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
