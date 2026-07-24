import { IProduct } from '@/types/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useEffect, useState } from 'react';

export interface ICartContext {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
}

const defaultValue: ICartContext = {
  products: [],
  setProducts: (products: IProduct[]) => {
    defaultValue.products = products;
  },
};

export const CartContext = createContext<ICartContext>(defaultValue);

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

  return (
    <CartContext.Provider value={{ products, setProducts }}>
      {children}
    </CartContext.Provider>
  );
};
