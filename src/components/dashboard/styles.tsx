import { IProduct } from '@/types/product';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
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
