import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AppNavigation } from '@/components/app-navigation';
import { Container } from '@/components/container';
import { CartProvider } from '@/contexts/CartContext';
import { StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <AnimatedSplashOverlay />
      <CartProvider>
        <AppNavigation />
      </CartProvider>
    </Container>
  );
}
