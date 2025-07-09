import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const userRole = 'recipient'; // Replace with real auth logic

      if (userRole === 'recipient') {
        router.replace('/bloodRequest/blood_request');
      } else {
        router.replace('/auth/RegisterScreen');
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);
}