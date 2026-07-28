import { Product } from '@/components/dashboard/product';
import { FloatingCart } from '@/components/floating-cart';
import { useCart } from '@/hooks/use-cart';
import { IProduct } from '@/types/product';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  Container,
  ProductContainer,
  ProductList,
} from '../components/dashboard/styles';
import { api } from '../services/api';

export default function Dashboard() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('products');

        setProducts(data);
      } catch {
        Alert.alert(
          'Ops! Não foi possivel carregar os produtos agora, tente novamente mais tarde!',
        );
      }
    })();
  }, []);

  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={(item: IProduct) => item.id}
          ListFooterComponentStyle={{
            height: 80,
          }}
          numColumns={2}
          renderItem={({ item }: { item: IProduct }) => (
            <Product item={item} onPress={addToCart} />
          )}
        />
      </ProductContainer>
      <FloatingCart />
    </Container>
  );
}
