import { createContext } from 'react';

import { IProduct } from '../contracts/product';

interface ICartContext {
  products: IProduct[];
  addToCart(item: Omit<IProduct, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const products: IProduct[] = [];

export const CartContext = createContext<ICartContext>({
  addToCart: (item: IProduct) => {
    const productIndex = products.findIndex(({ id }) => item.id === id);

    if (productIndex) {
      products[productIndex].quantity += 1;
    } else {
      products.push(item);
    }
  },
  products,
  increment: (id: string) => {
    const productIndex = products.findIndex(item => item.id === id);

    products[productIndex].quantity += 1;
  },
  decrement: (id: string) => {
    const productIndex = products.findIndex(item => item.id === id);

    products[productIndex].quantity -= 1;
    if (products[productIndex].quantity <= 0) {
      products.splice(productIndex, 1);
    }
  },
});
