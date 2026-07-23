import Feather from '@react-native-vector-icons/feather';
import { router } from 'expo-router';
import React, { useContext, useMemo } from 'react';

import { formatValue } from '@/constants/format-value';
import { CartContext } from '@/contexts/CartContext';
import {
  CartButton,
  CartButtonText,
  CartItemsTotal,
  CartPricing,
  CartTotalPrice,
  Container,
} from './styles';

export const FloatingCart: React.FC = () => {
  const { products } = useContext(CartContext);

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
      <CartButton
        style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20 }}
        onPress={() => {
          router.push('/cart');
        }}
      >
        <CartItemsTotal testID="navigate-to-cart-button">
          <Feather name="shopping-cart" size={24} color="#fff" />
          <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
        </CartItemsTotal>

        <CartPricing>
          <CartTotalPrice testID="cart-total-price">{cartTotal}</CartTotalPrice>
        </CartPricing>
      </CartButton>
    </Container>
  );
};
