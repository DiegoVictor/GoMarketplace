import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { IProduct } from '../../contracts/product';
import { useCart } from '../../hooks/cart';
import api from '../../services/api';
import { Product } from './Product';
import { FloatingCart } from '../../components/FloatingCart';
import { Container, ProductContainer, ProductList } from './styles';

export const Dashboard: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('products');

        setProducts(data);
      } catch (err) {
        Alert.alert(
          'Ops! Não foi possivel carregar os produtos agora, tente novamente mais tarde!',
        );
      }
    })();
  }, []);

  return (
    <Container>
      <ProductContainer>
        <ProductList<React.ElementType>
          data={products}
          keyExtractor={(item: IProduct) => item.id}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }: { item: IProduct }) => (
            <Product item={item} onPress={addToCart} />
          )}
        />
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
};
