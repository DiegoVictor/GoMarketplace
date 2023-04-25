import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { IProduct } from '../../contracts/product';

export const Container = styled.SafeAreaView`
  align-items: center;
  flex: 1;
`;

export const ProductContainer = styled.View`
  border-radius: 5px;
  flex: 1;
  flex-direction: row;
  margin-top: 60px;
`;

export const ProductList = styled(FlatList as new () => FlatList<IProduct>)`
  flex: 1;
  padding: 0 10px;
`;

export const TotalProductsContainer = styled.View`
  position: absolute;
  bottom: 0px;

  flex-direction: row;
  background: #e83f5b;

  padding: 20px 40px;
  justify-content: space-between;
  align-items: center;
`;

export const TotalProductsText = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-left: 15px;

  flex: 1;
  font-weight: bold;
`;

export const SubtotalValue = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
