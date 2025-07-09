import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DonorPage() {
  const router = useRouter();
  const [profileVisible, setProfileVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Profile Icon */}
      <TouchableOpacity style={styles.profileIcon} onPress={() => setProfileVisible(true)}>
        <Ionicons name="person-circle-outline" size={32} color="#333" />
      </TouchableOpacity>

      {/* Chatbot Icon */}
      <TouchableOpacity style={styles.chatIcon} onPress={() => setChatVisible(true)}>
        <MaterialCommunityIcons name="robot-outline" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.heading}>Donor Dashboard</Text>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => router.push('/(tabs)/donor/incoming')}
        >
          <Text style={styles.buttonText}>Incoming Requests</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => router.push('/(tabs)/donor/accepted')}
        >
          <Text style={styles.buttonText}>Accepted Requests</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Modal */}
      <Modal visible={profileVisible} transparent animationType="slide">
        <View style={styles.rightSlideOverlay}>
          <View style={styles.rightSlidePopup}>
            <TouchableOpacity onPress={() => setProfileVisible(false)} style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.popupTitle}>Profile</Text>
            <Text>Name: Jane Smith</Text>
            <Text>Blood Group: O-</Text>
            <Text>Email: janesmith@example.com</Text>
          </View>
        </View>
      </Modal>

      {/* Chatbot Modal */}
      <Modal visible={chatVisible} transparent animationType="slide">
        <View style={styles.rightSlideOverlay}>
          <View style={styles.rightSlidePopup}>
            <TouchableOpacity onPress={() => setChatVisible(false)} style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.popupTitle}>Chatbot</Text>
            <Text>Hi! Ask me anything about your donations.</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#212121',
  },
  profileIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  chatIcon: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 30,
    padding: 12,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 40,
    gap: 15,
    alignItems: 'center',
  },
  mainButton: {
    width: '80%',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  rightSlideOverlay: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  rightSlidePopup: {
    width: width * 0.75,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 30,
    elevation: 6,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  backButton: {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 10,
  },
});
