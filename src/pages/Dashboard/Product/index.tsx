import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { formatValue } from '../../../utils/formatValue';
import { IProduct } from '../../../contracts/product';
import { Button, Container, Image, Price, Footer, Title } from './styles';

export const Product: React.FC<{
  item: IProduct;
  onPress: (item: IProduct) => void;
}> = ({ item, onPress }) => {
  return (
    <Container>
      <Image source={{ uri: item.image_url }} />
      <Title>{item.title}</Title>
      <Footer>
        <Price>{formatValue(item.price)}</Price>
        <Button testID={`add-to-cart-${item.id}`} onPress={() => onPress(item)}>
          <FeatherIcon size={20} name="plus" color="#C4C4C4" />
        </Button>
      </Footer>
    </Container>
  );
};
