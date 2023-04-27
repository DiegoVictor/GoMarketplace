import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from './styles';
import { AppProvider } from './hooks';
import { AppRoutes } from './routes';

function App(): JSX.Element {
  return (
    <Container>
      <AppProvider>
        <StatusBar barStyle="light-content" backgroundColor="#312e38" />
        <AppRoutes />
      </AppProvider>
    </Container>
  );
}

export default App;
