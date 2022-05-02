import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { CartProvider } from './cart';

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </CartProvider>
  );
};

export default AppProvider;
