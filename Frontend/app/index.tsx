import { useAuth } from '../utils/authContext';
import { Redirect } from 'expo-router';

export default function IndexPage() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/auth/LoginScreen" />;
  }

  if (user.role === 'donor') {
    return <Redirect href="/donor" />;
  }

  if (user.role === 'recipient') {
    return <Redirect href="/recipient" />;
  }

  return null;
}
