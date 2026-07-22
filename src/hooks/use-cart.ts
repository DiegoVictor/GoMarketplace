import { IProduct } from '@/constants/product';
import { CartContext, ICartContext } from '@/contexts/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';

export function useCart() {
  const { products, setProducts } = useContext<ICartContext>(CartContext);

  const increment = async (id: string) => {
    const index = products.findIndex(product => product.id === id);

    const data = [...products];
    data[index].quantity += 1;

    setProducts(data);
    await AsyncStorage.setItem('cart', JSON.stringify(data));
  };

  const decrement = async (id: string) => {
    const index = products.findIndex(item => item.id === id);

    let data = [...products];
    data[index].quantity -= 1;

    data = data.filter(product => product.quantity > 0);

    setProducts(data);
    await AsyncStorage.setItem('cart', JSON.stringify(data));
  };

  const addToCart = async (product: IProduct) => {
    const item = products.find(({ id }) => product.id === id);

    if (!item) {
      const data = [...products, Object.assign({}, product, { quantity: 1 })];
      setProducts(data);

      await AsyncStorage.setItem('cart', JSON.stringify(data));
    } else {
      increment(product.id);
    }
  };

  return { addToCart, increment, decrement };
}
