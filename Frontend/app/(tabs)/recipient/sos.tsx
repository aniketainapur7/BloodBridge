import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';

export default function SOSPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency SOS</Text>
      <Button title="Send SOS Alert" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: 'center', flex: 1 },
  title: { fontSize: 22, marginBottom: 20 },
});
