import { CartContext, CartProvider } from '@/contexts/CartContext';
import { IProduct } from '@/types/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render, renderHook } from '@testing-library/react-native';
import { useContext } from 'react';
import { Text } from 'react-native';
import { factory } from '../utils/factory';

describe('CartContext', () => {
  it('should provide default values', async () => {
    const { result } = await renderHook(() => useContext(CartContext));
    expect(result.current).toEqual({
      products: [],
      setProducts: expect.any(Function),
    });
  });

  it('should update products when setProducts is called', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);

    const { result } = await renderHook(() => useContext(CartContext));

    result.current.setProducts(products);
    expect(result.current.products).toEqual(products);
  });

  it('should load products from AsyncStorage on mount', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 3);
    AsyncStorage.setItem('cart', JSON.stringify(products));

    const MyComponent = () => {
      const { products } = useContext(CartContext);
      return (
        <>
          {products.map(product => (
            <Text key={product.id}>{product.title}</Text>
          ))}
        </>
      );
    };

    const { getByText } = await render(
      <CartProvider>
        <MyComponent />
      </CartProvider>,
    );

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('cart');
    products.forEach(product => {
      expect(getByText(product.title)).toBeTruthy();
    });
  });

  it('should load empty products from AsyncStorage on mount', async () => {
    AsyncStorage.setItem('cart', JSON.stringify([]));

    const MyComponent = () => {
      const { products } = useContext(CartContext);
      return (
        <>
          {products.length > 0 ? (
            products.map(product => (
              <Text key={product.id}>{product.title}</Text>
            ))
          ) : (
            <Text>Cart is empty</Text>
          )}
        </>
      );
    };

    const { getByText } = await render(
      <CartProvider>
        <MyComponent />
      </CartProvider>,
    );

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('cart');
    expect(getByText('Cart is empty')).toBeTruthy();
  });
});
