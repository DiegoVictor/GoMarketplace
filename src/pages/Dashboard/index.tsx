import React, { useState, useEffect } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Alert, View } from 'react-native';

import { IProduct } from '../../contracts/product';
import { useCart } from '../../hooks/cart';
import api from '../../services/api';
import { Product } from './Product';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      try {
        const { data } = await api.get('products');

        setProducts(data);
      } catch (err) {
        Alert.alert(
          'Ops! Não foi possivel carregar os produtos agora, tente novamente mais tarde!',
        );
      }
    }

    loadProducts();
  }, []);

  function handleAddToCart(item: Product): void {
    addToCart(item);
  }

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

export default Dashboard;
