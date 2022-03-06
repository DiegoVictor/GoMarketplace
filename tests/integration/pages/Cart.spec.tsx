import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';

import Cart from '../../../src/pages/Cart';
import factory from '../../utils/factory';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

let mockProducts = [];
const mockIncrement = jest.fn();
const mockDecrement = jest.fn();
jest.mock('../../../src/hooks/cart.tsx', () => ({
  __esModule: true,
  useCart: () => ({
    addToCart: jest.fn(),
    products: mockProducts,
    increment: mockIncrement,
    decrement: mockDecrement,
  }),
}));

jest.mock('../../../src/utils/formatValue.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(value => value),
}));

describe('Cart', () => {
  it('should be able to list products on the cart', async () => {
    mockProducts = await factory.attrsMany<Product>('Product', 2);
    const { getByText, getByTestId } = render(<Cart />);

    mockProducts.forEach(product => {
      expect(getByText(product.title)).toBeTruthy();
      expect(getByTestId(`item-${product.id}-price`)).toHaveTextContent(
        Intl.NumberFormat('en', {
          style: 'decimal',
        }).format(product.price),
      );
      expect(getByText(`${product.price * product.quantity}`)).toBeTruthy();
      expect(getByTestId(`item-${product.id}-quantity`)).toHaveTextContent(
        `${product.quantity}x`,
      );
    });
  });

  it('should be able to calculate the cart total', async () => {
    mockProducts = await factory.attrsMany<Product>('Product', 2);

    const { getByText } = render(<Cart />);

    const sum = mockProducts.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
    expect(getByText(sum.toString())).toBeTruthy();
  });

  it('should be able to calculate the cart total', async () => {
    mockProducts = await factory.attrsMany<Product>('Product', 2);

    const { getByText } = render(<Cart />);

    const sum = mockProducts.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    expect(getByText(`${sum} itens`)).toBeTruthy();
  });

  it('should be able to increment product quantity on the cart', async () => {
    const product = await factory.attrs<Product>('Product');
    mockProducts = [product];

    const { getByTestId } = render(<Cart />);

    await act(async () => {
      fireEvent.press(getByTestId(`increment-${product.id}`));
    });

    expect(mockIncrement).toHaveBeenCalledWith(`${product.id}`);
  });

  it('should be able to decrement product quantity on the cart', async () => {
    const product = await factory.attrs<Product>('Product');
    mockProducts = [product];

    const { getByTestId } = render(<Cart />);

    await act(async () => {
      fireEvent.press(getByTestId(`decrement-${product.id}`));
    });

    expect(mockDecrement).toHaveBeenCalledWith(`${product.id}`);
  });
});
