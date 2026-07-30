import { Product } from '@/components/cart/product';
import {
  Container,
  ProductContainer,
  ProductList,
  SubtotalValue,
  TotalProductsContainer,
  TotalProductsText,
} from '@/components/cart/styles';
import { CartContext } from '@/contexts/CartContext';
import { formatValue } from '@/helpers/format-value';
import { useCart } from '@/hooks/use-cart';
import Feather from '@react-native-vector-icons/feather';
import { useContext, useMemo } from 'react';

export default function Cart() {
  const { increment, decrement } = useCart();
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
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={item => item.id}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }) => (
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
        <Feather name="shopping-cart" color="#fff" size={24} />
        <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>
    </Container>
  );
}
