import { fireEvent, render } from '@testing-library/react-native';

import { ICartContext } from '@/contexts/CartContext';
import { Context } from 'react';
import Cart from '../../src/app/cart';
import { IProduct } from '../../src/types/product';
import { factory } from '../utils/factory';

const mockUseCart = jest.fn();
jest.mock('../../src/hooks/use-cart', () => ({
  useCart: () => mockUseCart(),
}));

const mockFormatValue = jest.fn();
jest.mock('../../src/helpers/format-value.ts', () => {
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

describe('Cart', () => {
  it('should be able to list products on the cart', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);

    mockFormatValue.mockImplementation(value => value.toString());
    mockUseCart.mockReturnValueOnce({
      increment: jest.fn(),
      decrement: jest.fn(),
    });
    mockUseContext.mockReturnValueOnce({
      products,
    });

    const { getByText, getByTestId } = await render(<Cart />);

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

  it('should be able to calculate the cart cost total', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);

    mockFormatValue.mockImplementation(value => value.toString());
    mockUseCart.mockReturnValueOnce({
      increment: jest.fn(),
      decrement: jest.fn(),
    });
    mockUseContext.mockReturnValueOnce({
      products,
    });
    const { getByText } = await render(<Cart />);

    const sum = products.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
    expect(getByText(sum.toString())).toBeTruthy();
  });

  it('should be able to calculate the cart items total', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);

    mockFormatValue.mockImplementation(value => value.toString());
    mockUseCart.mockReturnValueOnce({
      increment: jest.fn(),
      decrement: jest.fn(),
    });
    mockUseContext.mockReturnValueOnce({
      products,
    });

    const { getByText } = await render(<Cart />);

    const sum = products.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    expect(getByText(`${sum} itens`)).toBeTruthy();
  });

  it('should be able to increment product quantity on the cart', async () => {
    const product = await factory.attrs<IProduct>('Product');
    const increment = jest.fn();

    mockUseCart.mockReturnValueOnce({
      increment,
    });

    mockUseContext.mockReturnValueOnce({
      products: [product],
    });

    const { getByTestId } = await render(<Cart />);

    await fireEvent.press(getByTestId(`increment-${product.id}`));

    expect(increment).toHaveBeenCalledWith(`${product.id}`);
  });

  it('should be able to decrement product quantity on the cart', async () => {
    const product = await factory.attrs<IProduct>('Product');
    const decrement = jest.fn();

    mockUseCart.mockReturnValueOnce({
      decrement,
    });

    mockUseContext.mockReturnValueOnce({
      products: [product],
    });

    const { getByTestId } = await render(<Cart />);

    await fireEvent.press(getByTestId(`decrement-${product.id}`));

    expect(decrement).toHaveBeenCalledWith(`${product.id}`);
  });
});
