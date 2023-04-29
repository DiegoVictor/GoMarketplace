import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  render,
  fireEvent,
  act,
  cleanup,
  waitFor,
} from '@testing-library/react-native';

import { CartProvider, useCart } from '../../../src/hooks/cart';
import { factory } from '../../utils/factory';
import { IProduct } from '../../../src/contracts/product';

const mockSetItem = jest.fn();
const mockGetItem = jest.fn();

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    setItem: () => mockSetItem(),
    removeItem: jest.fn(),
    getItem: () => mockGetItem(),
    clear: jest.fn(),
  },
}));

const Component: React.FC<{ product: IProduct }> = ({ product }) => {
  const { products, addToCart, increment, decrement } = useCart();

  return (
    <>
      <TouchableOpacity
        testID="add-to-cart"
        onPress={() => {
          addToCart(product);
        }}
      >
        Add to cart
      </TouchableOpacity>

      <TouchableOpacity
        testID="increment"
        onPress={() => {
          increment(product.id);
        }}
      >
        Increment
      </TouchableOpacity>

      <TouchableOpacity
        testID="decrement"
        onPress={() => {
          decrement(product.id);
        }}
      >
        Decrement
      </TouchableOpacity>

      {products.map(({ id, title, quantity }) => (
        <View key={id}>
          <Text>{title}</Text>
          <Text>{quantity}</Text>
        </View>
      ))}
    </>
  );
};

describe('Cart Context', () => {
  afterEach(() => {
    cleanup();
  });

  it('should be able to add a product to the cart', async () => {
    const product = await factory.attrs<IProduct>('Product');
    const { getByText, getByTestId } = render(
      <CartProvider>
        <Component product={product} />
      </CartProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    expect(getByText(product.title)).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
  });

  it('should be able to increment a product already added to cart', async () => {
    const product = await factory.attrs<IProduct>('Product', { quantity: 1 });

    const { getByText, getByTestId } = render(
      <CartProvider>
        <Component product={product} />
      </CartProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    expect(getByText('2')).toBeTruthy();
  });

  it('should be able to increment quantity', async () => {
    const product = await factory.attrs<IProduct>('Product');
    const { getByText, getByTestId } = render(
      <CartProvider>
        <Component product={product} />
      </CartProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('increment'));
    });

    expect(getByText('2')).toBeTruthy();
  });

  it('should be able to decrement quantity', async () => {
    const product = await factory.attrs<IProduct>('Product');
    const { getByText, getByTestId } = render(
      <CartProvider>
        <Component product={product} />
      </CartProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('increment'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('decrement'));
    });

    expect(getByText('1')).toBeTruthy();
  });

  it('should store products in AsyncStorage while adding, incrementing and decrementing', async () => {
    const product = await factory.attrs<IProduct>('Product');

    mockSetItem.mockClear();
    const { getByTestId } = render(
      <CartProvider>
        <Component product={product} />
      </CartProvider>,
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-to-cart'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('increment'));
    });

    await act(async () => {
      fireEvent.press(getByTestId('decrement'));
    });

    expect(mockSetItem).toHaveBeenCalledTimes(3);
  });

  it('should load products from AsyncStorage', async () => {
    const product = await factory.attrs<IProduct>('Product');
    const { title, id, image_url, price } = await factory.attrs<IProduct>(
      'Product',
    );
    mockGetItem.mockReturnValue(
      Promise.resolve(
        JSON.stringify([
          {
            title,
            id,
            image_url,
            price,
            quantity: 0,
          },
        ]),
      ),
    );

    const { getByText } = render(
      <CartProvider>
        <Component product={product} />
      </CartProvider>,
    );

    await waitFor(() => expect(getByText(title)).toBeTruthy());

    expect(getByText(title)).toBeTruthy();
  });

  it('should not be able to render component without provider', async () => {
    const product = await factory.attrs<IProduct>('Product');

    console.error = jest.fn();

    try {
      render(
        <CartProvider>
          <Component product={product} />
        </CartProvider>,
      );
    } catch (err) {
      expect(err).toStrictEqual(
        new Error('useCart must be used within a CartProvider'),
      );
    }
  });
});
