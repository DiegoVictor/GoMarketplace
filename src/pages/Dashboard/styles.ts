import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { IProduct } from '../../contracts/product';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const ProductContainer = styled.View`
  border-radius: 5px;
  margin-top: 60px;
  flex: 1;
  flex-direction: row;
`;

export const ProductList = styled(
  FlatList as new () => FlatList<IProduct>,
).attrs({
  numColumns: 2,
})`
  flex: 1;
  padding: 0 10px;
`;
