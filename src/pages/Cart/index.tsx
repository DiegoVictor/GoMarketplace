import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';

import { useCart } from '../../hooks/cart';
import { formatValue } from '../../utils/formatValue';
import { Product } from './Product';
import {
  Container,
  ProductContainer,
  ProductList,
  SubtotalValue,
  TotalProductsContainer,
  TotalProductsText,
} from './styles';

interface Item {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const { increment, decrement, products } = useCart();

  const cartTotal = useMemo(() => {
    const total = products.reduce(
      (sum, product) => product.price * product.quantity + sum,
      0,
    );

    return formatValue(total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    return products.reduce((sum, product) => sum + product.quantity, 0);
  }, [products]);

  return (
    <Container>
      <ProductContainer>
        <ProductList<React.ElementType>
          data={products}
          keyExtractor={(item: Item) => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }: { item: IProduct }) => (
            <Product
              item={item}
              onPress={{
                increment,
                decrement,
              }}
            />
          )}
        />
      </ProductContainer>
      <TotalProductsContainer>
        <FeatherIcon name="shopping-cart" color="#fff" size={24} />
        <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>
    </Container>
  );
};

export default Cart;
