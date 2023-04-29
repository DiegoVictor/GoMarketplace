import React from 'react';
import AxiosMock from 'axios-mock-adapter';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

import api from '../../../src/services/api';
import { Dashboard } from '../../../src/pages/Dashboard';
import { factory } from '../../utils/factory';
import { IProduct } from '../../../src/contracts/product';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({ navigate: mockNavigate }),
  };
});

const mockUseCart = jest.fn();
jest.mock('../../../src/hooks/cart.tsx', () => ({
  useCart: () => mockUseCart(),
}));

const apiMock = new AxiosMock(api);

describe('Dashboard', () => {
  it('should be able to list products', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);
    const [product] = products;

    mockUseCart.mockReturnValue({
      products: [],
    });

    apiMock.onGet('products').reply(200, products);

    const { getByText, getByTestId } = render(<Dashboard />);

    await waitFor(() => expect(getByText(product.title)).toBeTruthy(), {
      timeout: 200,
    });

    products.forEach(({ title, id }) => {
      expect(getByText(title)).toBeTruthy();
      expect(getByTestId(`add-to-cart-${id}`)).toBeTruthy();
    });
  });

  it('should not be able to list products', async () => {
    apiMock.onGet('products').reply(404);

    mockUseCart.mockReturnValue({
      products: [],
    });

    const alert = jest.spyOn(Alert, 'alert');
    render(<Dashboard />);

    await waitFor(() => expect(alert).toHaveBeenCalled());

    expect(alert).toHaveBeenCalledWith(
      'Ops! Não foi possivel carregar os produtos agora, tente novamente mais tarde!',
    );
  });

  it('should be able to add item to cart', async () => {
    const product = await factory.attrs<IProduct>('Product');
    apiMock.onGet('products').reply(200, [product]);

    const addToCart = jest.fn();
    mockUseCart.mockReturnValue({
      products: [],
      addToCart,
    });

    const { getByText, getByTestId } = render(<Dashboard />);

    await waitFor(() => expect(getByText(product.title)).toBeTruthy(), {
      timeout: 200,
    });

    act(() => {
      fireEvent.press(getByTestId(`add-to-cart-${product.id}`));
    });

    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
