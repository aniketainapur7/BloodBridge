import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput style={styles.input} placeholder="Type a message..." value={input} onChangeText={setInput} />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  message: { padding: 10, backgroundColor: '#eee', marginVertical: 4 },
  input: { borderBottomWidth: 1, marginBottom: 8 },
});
