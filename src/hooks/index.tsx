import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { CartProvider } from './cart';

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <CartProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </CartProvider>
  );
};
