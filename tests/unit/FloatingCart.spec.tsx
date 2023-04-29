import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';

import { FloatingCart } from '../../src/components/FloatingCart';
import { factory } from '../utils/factory';
import { IProduct } from '../../src/contracts/product';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({ navigate: mockNavigate }),
  };
});

const mockUseCart = jest.fn();
jest.mock('../../src/hooks/cart.tsx', () => ({
  useCart: () => mockUseCart(),
}));

const mockFormatValue = jest.fn();
mockFormatValue.mockImplementation(value => value);

jest.mock('../../src/utils/formatValue.ts', () => {
  return {
    formatValue: (value: number) => mockFormatValue(value),
  };
});

describe('FloatingCart', () => {
  it('should be able to calculate the cart total', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);

    mockUseCart.mockReturnValue({
      products,
    });

    const { getByText } = render(<FloatingCart />);

    const sum = products.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
    expect(getByText(sum.toString())).toBeTruthy();
  });

  it('should be able to show the total quantity of itens in the cart', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);

    mockUseCart.mockReturnValueOnce({
      products,
    });

    const { getByText } = render(<FloatingCart />);

    const sum = products.reduce((total, item) => {
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
