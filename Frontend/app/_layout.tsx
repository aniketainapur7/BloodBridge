// app/_layout.tsx
import { Slot } from 'expo-router';
import { AuthProvider } from '../utils/authContext'; // You will create this next

export default function Layout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
