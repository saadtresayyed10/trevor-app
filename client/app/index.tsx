import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { useAuthStore } from '~/store/authStore';

export default function Home() {
  const { isAuthenticated, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return null; // Prevent rendering until auth check is done
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        <Button title="Logout" onPress={logout} />
      </Container>
    </>
  );
}
