import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function DonorPage() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donor Dashboard</Text>
      <Button title="Incoming Requests" onPress={() => router.push('/(tabs)/donor/incoming')} />
      <Button title="Accepted Requests" onPress={() => router.push('/(tabs)/donor/accepted')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
});
