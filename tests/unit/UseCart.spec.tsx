import { CartContext, ICartContext } from '@/contexts/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook } from '@testing-library/react-native';
import { PropsWithChildren } from 'react';
import { useCart } from '../../src/hooks/use-cart';
import { IProduct } from '../../src/types/product';
import { factory } from '../utils/factory';

describe('UseCart Hook', () => {
  it('should be able to add a product to the cart', async () => {
    const product = await factory.attrs<IProduct>('Product', { quantity: 0 });

    const setProducts = jest.fn();
    const value: ICartContext = {
      products: [],
      setProducts,
    };

    const wrapper: React.FC<PropsWithChildren> = ({ children }) => {
      return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
      );
    };

    const { result } = await renderHook(() => useCart(), { wrapper });

    await act(async () => {
      await result.current.addToCart(product);
    });

    expect(setProducts).toHaveBeenCalledWith([
      {
        ...product,
        quantity: 1,
      },
    ]);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([
        {
          ...product,
          quantity: 1,
        },
      ]),
    );
  });

  it('should be able to increment a product quantity using addToCart', async () => {
    const product = await factory.attrs<IProduct>('Product', { quantity: 1 });

    const setProducts = jest.fn();
    const value: ICartContext = {
      products: [product],
      setProducts,
    };

    const wrapper: React.FC<PropsWithChildren> = ({ children }) => {
      return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
      );
    };

    const { result } = await renderHook(() => useCart(), { wrapper });

    const quantity = product.quantity;

    await act(async () => {
      await result.current.addToCart(product);
    });
    await act(async () => {
      await result.current.addToCart(product);
    });

    expect(setProducts).toHaveBeenCalledWith([
      {
        ...product,
        quantity: quantity + 2,
      },
    ]);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([
        {
          ...product,
          quantity: quantity + 2,
        },
      ]),
    );
  });

  it('should be able to increment quantity', async () => {
    const product = await factory.attrs<IProduct>('Product', { quantity: 1 });

    const setProducts = jest.fn();
    const value: ICartContext = {
      products: [product],
      setProducts,
    };

    const wrapper: React.FC<PropsWithChildren> = ({ children }) => {
      return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
      );
    };

    const { result } = await renderHook(() => useCart(), { wrapper });

    const quantity = product.quantity;

    await act(async () => {
      await result.current.increment(product.id);
    });
    await act(async () => {
      await result.current.increment(product.id);
    });

    expect(setProducts).toHaveBeenCalledWith([
      {
        ...product,
        quantity: quantity + 2,
      },
    ]);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([
        {
          ...product,
          quantity: quantity + 2,
        },
      ]),
    );
  });

  it('should be able to decrement quantity', async () => {
    const product = await factory.attrs<IProduct>('Product', { quantity: 2 });

    const setProducts = jest.fn();
    const value: ICartContext = {
      products: [product],
      setProducts,
    };

    const wrapper: React.FC<PropsWithChildren> = ({ children }) => {
      return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
      );
    };

    const { result } = await renderHook(() => useCart(), { wrapper });

    const quantity = product.quantity;
    await act(async () => {
      await result.current.decrement(product.id);
    });

    expect(setProducts).toHaveBeenCalledWith([
      {
        ...product,
        quantity: quantity - 1,
      },
    ]);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([
        {
          ...product,
          quantity: quantity - 1,
        },
      ]),
    );
  });
});
