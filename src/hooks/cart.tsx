import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const cart = await AsyncStorage.getItem('cart');

      if (cart) {
        setProducts(JSON.parse(cart));
      }
    }

    loadProducts();
  }, []);

  const increment = useCallback(
    async id => {
      const productIndex = products.findIndex(product => product.id === id);

      if (productIndex > -1) {
        const data = [...products];
        data[productIndex].quantity += 1;
        setProducts(data);
        await AsyncStorage.setItem('cart', JSON.stringify(data));
      }
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const product = products.find(item => item.id === id);

      if (product) {
        let data = products.filter(item => item.id !== id);

        product.quantity -= 1;
        if (product.quantity > 0) {
          data = products.map(item => (item.id === id ? product : item));
        }

        setProducts(data);
        await AsyncStorage.setItem('cart', JSON.stringify(data));
      }
    },
    [products],
  );

  const addToCart = useCallback(
    async product => {
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

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
