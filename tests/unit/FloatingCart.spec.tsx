import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';

import FloatingCart from '../../src/components/FloatingCart';
import factory from '../utils/factory';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true,
    ...originalModule,
    useNavigation: () => ({ navigate: mockNavigate }),
  };
});

let mockProducts = [];
jest.mock('../../src/hooks/cart.tsx', () => ({
  __esModule: true,
  useCart: () => ({
    addToCart: jest.fn(),
    products: mockProducts,
  }),
}));

jest.mock('../../src/utils/formatValue.ts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(value => value),
}));

describe('Dashboard', () => {
  it('should be able to calculate the cart total', async () => {
    mockProducts = await factory.attrsMany<Product>('Product', 2);

    const { getByText } = render(<FloatingCart />);

    const sum = mockProducts.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
    expect(getByText(sum.toString())).toBeTruthy();
  });

  it('should be able to show the total quantity of itens in the cart', async () => {
    mockProducts = await factory.attrsMany<Product>('Product', 2);

    const { getByText } = render(<FloatingCart />);

    const sum = mockProducts.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    expect(getByText(`${sum} itens`)).toBeTruthy();
  });

  it('should be able to navigate to the cart', async () => {
    const { getByTestId } = render(<FloatingCart />);

    await act(async () => {
      fireEvent.press(getByTestId('navigate-to-cart-button'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('Cart');
  });
});
