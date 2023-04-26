import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';

import { Cart } from '../../../src/pages/Cart';
import { factory } from '../../utils/factory';
import { IProduct } from '../../../src/contracts/product';

const mockUseCart = jest.fn();
jest.mock('../../../src/hooks/cart.tsx', () => ({
  useCart: () => mockUseCart(),
}));

const mockFormatValue = jest.fn();
mockFormatValue.mockImplementation(value => value);

jest.mock('../../../src/utils/formatValue.ts', () => {
  return {
    formatValue: (value: number) => mockFormatValue(value),
  };
});

describe('Cart', () => {
  it('should be able to list products on the cart', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);

    mockUseCart.mockReturnValue({
      products,
    });

    const { getByText, getByTestId } = render(<Cart />);

    products.forEach(product => {
      expect(getByText(product.title)).toBeTruthy();
      expect(getByTestId(`item-${product.id}-price`)).toHaveTextContent(
        `${product.price}`,
      );
      expect(getByText(`${product.price * product.quantity}`)).toBeTruthy();
      expect(getByTestId(`item-${product.id}-quantity`)).toHaveTextContent(
        `${product.quantity}x`,
      );
    });
  });

  it('should be able to calculate the cart total', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);

    mockUseCart.mockReturnValue({
      products,
    });
    const { getByText } = render(<Cart />);

    const sum = products.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
    expect(getByText(sum.toString())).toBeTruthy();
  });

  it('should be able to calculate the cart total', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);
    mockUseCart.mockReturnValue({
      products,
    });

    const { getByText } = render(<Cart />);

    const sum = products.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    expect(getByText(`${sum} itens`)).toBeTruthy();
  });

  it('should be able to increment product quantity on the cart', async () => {
    const product = await factory.attrs<IProduct>('Product');
    const increment = jest.fn();
    mockUseCart.mockReturnValue({
      products: [product],
      increment,
    });

    const { getByTestId } = render(<Cart />);

    await act(async () => {
      fireEvent.press(getByTestId(`increment-${product.id}`));
    });

    expect(increment).toHaveBeenCalledWith(`${product.id}`);
  });

  it('should be able to decrement product quantity on the cart', async () => {
    const product = await factory.attrs<IProduct>('Product');
    const decrement = jest.fn();
    mockUseCart.mockReturnValue({
      products: [product],
      decrement,
    });

    const { getByTestId } = render(<Cart />);

    await act(async () => {
      fireEvent.press(getByTestId(`decrement-${product.id}`));
    });

    expect(decrement).toHaveBeenCalledWith(`${product.id}`);
  });
});
