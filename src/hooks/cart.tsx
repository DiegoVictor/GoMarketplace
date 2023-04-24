import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IProduct } from '../contracts/product';
import { CartContext } from '../contexts/cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      const cart = await AsyncStorage.getItem('cart');

      if (cart) {
        setProducts(JSON.parse(cart));
      }
    })();
  }, []);

  const increment = useCallback(
    async (id: string) => {
      const productIndex = products.findIndex(product => product.id === id);

      const data = [...products];

      data[productIndex].quantity += 1;

      setProducts(data);
      await AsyncStorage.setItem('cart', JSON.stringify(data));
    },
    [products],
  );

  const decrement = useCallback(
    async (id: string) => {
      const productIndex = products.findIndex(item => item.id === id);

      let data = [...products];
      data[productIndex].quantity -= 1;

      data = data.filter(product => product.quantity > 0);

      setProducts(data);
      await AsyncStorage.setItem('cart', JSON.stringify(data));
    },
    [products],
  );

  const addToCart = useCallback(
    async (product: IProduct) => {
      const item = products.find(({ id }) => product.id === id);

      if (!item) {
        const data = [...products, { ...product, quantity: 1 }];
        setProducts(data);

        await AsyncStorage.setItem('cart', JSON.stringify(data));
      } else {
        increment(product.id);
      }
    },
    [products, increment],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const context = useContext(CartContext);

  return context;
}
