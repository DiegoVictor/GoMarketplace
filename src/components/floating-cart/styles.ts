import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView).attrs({
  edges: ['bottom'],
})`
  align-items: center;
  background: #e83f5b;
  bottom: 0px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
`;

export const CartButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  padding: 0px 20px;
`;

export const CartPricing = styled.View`
  align-items: flex-end;
  flex: 1;
  justify-content: center;
`;

export const CartTotalPrice = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const CartItemsTotal = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

export const CartButtonText = styled.Text`
  color: #fff;
  flex: 1;
  font-weight: bold;
  margin-left: 15px;
  margin-right: auto;
`;
