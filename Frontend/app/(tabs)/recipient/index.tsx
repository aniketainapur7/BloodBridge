import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function RecipientPage() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Recipient Dashboard</Text>
      <Button title="Request" onPress={() => router.push('/(tabs)/recipient/request')} />
      <Button title="SOS" onPress={() => router.push('/(tabs)/recipient/sos')} />
      <Button title="History" onPress={() => router.push('/(tabs)/recipient/history')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
