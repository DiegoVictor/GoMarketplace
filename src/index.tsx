import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';
import AppContainer from './hooks';
import { Container } from './styles';

const App: React.FC = () => (
  <Container>
    <AppContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Routes />
    </AppContainer>
  </Container>
);

export default App;
