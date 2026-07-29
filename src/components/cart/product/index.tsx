import { formatValue } from '@/helpers/format-value';
import { IProduct } from '@/types/product';
import Feather from '@react-native-vector-icons/feather';
import React from 'react';
import {
  Amount,
  Button,
  ButtonGroup,
  Container,
  Image,
  Price,
  Quantity,
  Summary,
  Title,
  Total,
} from './styles';

export const Product: React.FC<{
  item: IProduct;
  onPress: Record<string, (id: string) => void>;
}> = ({ item, onPress }) => {
  return (
    <Container>
      <Image source={{ uri: item.image_url }} />

      <Summary>
        <Title>{item.title}</Title>
        <Price testID={`item-${item.id}-price`}>
          {formatValue(item.price)}
        </Price>

        <Total>
          <Quantity
            testID={`item-${item.id}-quantity`}
          >{`${item.quantity}x`}</Quantity>
          <Amount>{formatValue(item.price * item.quantity)}</Amount>
        </Total>
      </Summary>

      <ButtonGroup>
        <Button
          testID={`increment-${item.id}`}
          onPress={() => onPress.increment(item.id)}
        >
          <Feather name="plus" color="#E83F5B" size={16} />
        </Button>
        <Button
          testID={`decrement-${item.id}`}
          onPress={() => onPress.decrement(item.id)}
        >
          <Feather name="minus" color="#E83F5B" size={16} />
        </Button>
      </ButtonGroup>
    </Container>
  );
};
