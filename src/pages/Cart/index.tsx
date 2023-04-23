import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';

import { useCart } from '../../hooks/cart';
import { formatValue } from '../../utils/formatValue';
import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
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

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

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
          renderItem={(result: { item: Item }) => (
            <Product>
              <ProductImage source={{ uri: result.item.image_url }} />
              <ProductTitleContainer>
                <ProductTitle>{result.item.title}</ProductTitle>
                <ProductPriceContainer>
                  <ProductSinglePrice testID={`item-${result.item.id}-price`}>
                    {formatValue(result.item.price)}
                  </ProductSinglePrice>

                  <TotalContainer>
                    <ProductQuantity
                      testID={`item-${result.item.id}-quantity`}
                    >{`${result.item.quantity}x`}</ProductQuantity>

                    <ProductPrice>
                      {formatValue(result.item.price * result.item.quantity)}
                    </ProductPrice>
                  </TotalContainer>
                </ProductPriceContainer>
              </ProductTitleContainer>
              <ActionContainer>
                <ActionButton
                  testID={`increment-${result.item.id}`}
                  onPress={() => handleIncrement(result.item.id)}
                >
                  <FeatherIcon name="plus" color="#E83F5B" size={16} />
                </ActionButton>
                <ActionButton
                  testID={`decrement-${result.item.id}`}
                  onPress={() => handleDecrement(result.item.id)}
                >
                  <FeatherIcon name="minus" color="#E83F5B" size={16} />
                </ActionButton>
              </ActionContainer>
            </Product>
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
