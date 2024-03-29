import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import Logo from '../assets/logo.png';
import { StackParamList } from '../contracts/stack-list';
import { Dashboard } from '../pages/Dashboard';
import { Cart } from '../pages/Cart';

const App = createNativeStackNavigator<StackParamList>();

const headerTitle = (): JSX.Element => <Image source={Logo} />;

const headerLeft: React.FC<{ goBack: () => void }> = ({ goBack }) => {
  return (
    <TouchableOpacity style={{ marginRight: 20 }} onPress={goBack}>
      <FeatherIcon name="chevron-left" size={24} />
    </TouchableOpacity>
  );
};

export const AppRoutes: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <App.Navigator
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: '#EBEEF8' },
      }}
      initialRouteName="Dashboard"
    >
      <App.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle,
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <App.Screen
        options={{
          headerTransparent: true,
          headerTitle,
          headerBackTitleVisible: false,
          headerLeft: () => headerLeft({ goBack }),
          headerBackVisible: false,
        }}
        name="Cart"
        component={Cart}
      />
    </App.Navigator>
  );
};
