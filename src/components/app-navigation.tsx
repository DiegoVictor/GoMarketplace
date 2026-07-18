import Feather from '@react-native-vector-icons/feather';
import { router, Stack } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';
import Logo from '../assets/logo.png';

export type StackParamList = {
  dashboard: undefined;
  cart: undefined;
};

export const AppNavigation = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: {
          backgroundColor: '#EBEEF8',
        },
      }}
      initialRouteName="dashboard"
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => <Image source={Logo} />,
        }}
        name="dashboard"
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: () => <Image source={Logo} />,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                router.back();
              }}
            >
              <Feather name="chevron-left" size={24} />
            </TouchableOpacity>
          ),
          headerBackVisible: false,
        }}
        name="cart"
      />
    </Stack>
  );
};
