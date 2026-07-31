import {
  CartContext,
  CartProvider,
  ICartContext,
} from '@/contexts/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render } from '@testing-library/react-native';
import { Context, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../../src/hooks/use-cart';
import { IProduct } from '../../src/types/product';
import { factory } from '../utils/factory';

const mockUseContext = jest.fn();
jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    useContext: (context: Context<ICartContext>) => mockUseContext(context),
  };
});

describe('UseCart Hook', () => {
  it(
    'should be able to add a product to the cart',
    async () => {
      const product = await factory.attrs<IProduct>('Product', { quantity: 0 });

      const setProducts = jest.fn();
      mockUseContext
        .mockImplementationOnce(() => ({
          products: [],
          setProducts,
        }))
        .mockImplementationOnce(() => ({ products: [product], setProducts }));

      const Cart = () => {
        const { addToCart } = useCart();
        const { products } = useContext(CartContext);

        return (
          <>
            {products.map(product => (
              <View key={product.id}>
                <TouchableOpacity
                  testID="add-to-cart"
                  onPress={() => {
                    addToCart(product);
                  }}
                >
                  <Text>Add to cart</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        );
      };

      const { getByTestId } = await render(
        <CartProvider>
          <Cart />
        </CartProvider>,
      );

      await fireEvent.press(getByTestId('add-to-cart'));

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
    },
    30 * 1000,
  );

  it('should be able to increment a product quantity using addToCart', async () => {
    const product = await factory.attrs<IProduct>('Product', { quantity: 1 });

    const setProducts = jest.fn();
    mockUseContext
      .mockImplementationOnce(() => ({
        products: [product],
        setProducts,
      }))
      .mockImplementationOnce(() => ({ products: [product], setProducts }));

    const Cart = () => {
      const { addToCart } = useCart();
      const { products } = useContext(CartContext);

      return (
        <>
          {products.map(product => (
            <View key={product.id}>
              <TouchableOpacity
                testID="add-to-cart"
                onPress={() => {
                  addToCart(product);
                }}
              >
                <Text>Increment</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      );
    };

    const { getByTestId } = await render(
      <CartProvider>
        <Cart />
      </CartProvider>,
    );

    const quantity = product.quantity;

    await fireEvent.press(getByTestId('add-to-cart'));
    await fireEvent.press(getByTestId('add-to-cart'));

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
    mockUseContext
      .mockImplementationOnce(() => ({
        products: [product],
        setProducts,
      }))
      .mockImplementationOnce(() => ({ products: [product], setProducts }));

    const Cart = () => {
      const { increment } = useCart();
      const { products } = useContext(CartContext);

      return (
        <>
          {products.map(product => (
            <View key={product.id}>
              <TouchableOpacity
                testID="increment-quantity"
                onPress={() => {
                  increment(product.id);
                }}
              >
                <Text>Increment</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      );
    };

    const { getByTestId } = await render(
      <CartProvider>
        <Cart />
      </CartProvider>,
    );

    const quantity = product.quantity;

    await fireEvent.press(getByTestId('increment-quantity'));
    await fireEvent.press(getByTestId('increment-quantity'));

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
    mockUseContext
      .mockImplementationOnce(() => ({
        products: [product],
        setProducts,
      }))
      .mockImplementationOnce(() => ({ products: [product], setProducts }));

    const Cart = () => {
      const { decrement } = useCart();
      const { products } = useContext(CartContext);

      return (
        <>
          {products.map(product => (
            <View key={product.id}>
              <TouchableOpacity
                testID="decrement-quantity"
                onPress={() => {
                  decrement(product.id);
                }}
              >
                <Text>Decrement</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      );
    };

    const { getByTestId } = await render(
      <CartProvider>
        <Cart />
      </CartProvider>,
    );

    const quantity = product.quantity;
    await fireEvent.press(getByTestId('decrement-quantity'));

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
