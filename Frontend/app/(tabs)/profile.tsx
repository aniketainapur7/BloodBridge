import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <Button title="Logout" onPress={() => router.replace('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 20 },
});
