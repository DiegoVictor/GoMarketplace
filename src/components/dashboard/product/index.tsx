import { formatValue } from '@/helpers/format-value';
import { IProduct } from '@/types/product';
import Feather from '@react-native-vector-icons/feather';
import React from 'react';
import { Button, Container, Footer, Image, Price, Title } from './styles';

export const Product: React.FC<{
  item: IProduct;
  onPress: (item: IProduct) => Promise<void>;
}> = ({ item, onPress }) => {
  return (
    <Container>
      <Image source={{ uri: item.image_url }} />
      <Title>{item.title}</Title>
      <Footer>
        <Price>{formatValue(item.price)}</Price>
        <Button
          testID={`add-to-cart-${item.id}`}
          onPress={async () => {
            await onPress(item);
          }}
        >
          <Feather size={20} name="plus" color="#C4C4C4" />
        </Button>
      </Footer>
    </Container>
  );
};
