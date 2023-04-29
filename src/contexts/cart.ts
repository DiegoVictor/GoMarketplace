import { createContext } from 'react';

import { IProduct } from '../contracts/product';

export interface ICartContext {
  products: IProduct[];
  addToCart(item: Omit<IProduct, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

export const CartContext = createContext({});
