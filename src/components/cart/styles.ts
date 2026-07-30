import { IProduct } from '@/types/product';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  align-items: center;
  background: #ebeef8;
  flex: 1;
`;

export const ProductContainer = styled.View`
  border-radius: 5px;
  flex: 1;
  flex-direction: row;
  margin-top: 60px;
`;

export const ProductList = styled(FlatList<IProduct>)`
  flex: 1;
  padding: 0 10px;
`;

export const TotalProductsContainer = styled(SafeAreaView).attrs({
  edges: ['bottom'],
})`
  align-items: center;
  background: #e83f5b;
  bottom: 0px;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 40px;
  position: absolute;
`;

export const TotalProductsText = styled.Text`
  color: #fff;
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  margin-left: 15px;
`;

export const SubtotalValue = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
