import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { ICartContext } from '@/contexts/CartContext';
import { Context } from 'react';
import { FloatingCart } from '../../src/components/floating-cart';
import { IProduct } from '../../src/constants/product';
import { factory } from '../utils/factory';

const mockPush = jest.fn();
jest.mock('expo-router', () => {
  const actualExpoRouter = jest.requireActual('expo-router');
  return {
    ...actualExpoRouter,
    router: {
      push: (route: string) => mockPush(route),
    },
  };
});

const mockFormatValue = jest.fn();
jest.mock('../../src/constants/format-value.ts', () => {
  return {
    formatValue: (value: number) => mockFormatValue(value),
  };
});

const mockUseContext = jest.fn();
jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    useContext: (context: Context<ICartContext>) => mockUseContext(context),
  };
});

describe('FloatingCart', () => {
  it('should be able to calculate the cart total', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);

    mockUseContext.mockReturnValueOnce({
      products,
    });
    mockFormatValue.mockImplementationOnce((value: number) => value.toString());

    const { getByText } = await render(<FloatingCart />);

    const sum = products.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    expect(getByText(sum.toString())).toBeTruthy();
  });

  it('should be able to show the total quantity of itens in the cart', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);

    mockUseContext.mockReturnValueOnce({
      products,
    });

    const { getByText, getByTestId } = await render(<FloatingCart />);

    await waitFor(() => getByTestId('cart-total-price'));

    const sum = products.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    expect(getByText(`${sum} itens`)).toBeTruthy();
  });

  it('should be able to navigate to the cart', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);
    mockUseContext.mockReturnValueOnce({
      products,
    });

    const { getByTestId } = await render(<FloatingCart />);

    await fireEvent.press(getByTestId('navigate-to-cart-button'));

    expect(mockPush).toHaveBeenCalledWith('/cart');
  });
});
