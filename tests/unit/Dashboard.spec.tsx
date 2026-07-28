import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Dashboard from '../../src/app/dashboard';
import { IProduct } from '../../src/types/product';
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

const mockUseCart = jest.fn();
jest.mock('../../src/hooks/use-cart', () => ({
  useCart: () => mockUseCart(),
}));

const mockApiGet = jest.fn();
jest.mock('../../src/services/api', () => {
  return {
    api: {
      get: () => mockApiGet(),
    },
  };
});

describe('Dashboard', () => {
  it('should be able to list products', async () => {
    const products = await factory.attrsMany<IProduct>('Product', 2);
    const [product] = products;

    mockUseCart.mockReturnValue({
      addToCart: jest.fn(),
    });

    mockApiGet.mockResolvedValueOnce({ data: products });

    const { getByText, getByTestId } = await render(<Dashboard />);

    await waitFor(() => expect(getByText(product.title)).toBeTruthy(), {
      timeout: 200,
    });

    products.forEach(({ title, id }) => {
      expect(getByText(title)).toBeTruthy();
      expect(getByTestId(`add-to-cart-${id}`)).toBeTruthy();
    });
  });

  it('should not be able to list products', async () => {
    mockApiGet.mockRejectedValueOnce(new Error('Not Found'));

    mockUseCart.mockReturnValueOnce({
      products: [],
      addToCart: jest.fn(),
    });

    const alert = jest.spyOn(Alert, 'alert');
    await render(<Dashboard />);

    await waitFor(() => expect(alert).toHaveBeenCalled());

    expect(alert).toHaveBeenCalledWith(
      'Ops! Não foi possivel carregar os produtos agora, tente novamente mais tarde!',
    );
  });

  it('should be able to add item to cart', async () => {
    const product = await factory.attrs<IProduct>('Product');
    mockApiGet.mockResolvedValueOnce({ data: [product] });

    const addToCart = jest.fn();
    mockUseCart.mockReturnValue({
      addToCart,
    });

    const { getByText, getByTestId } = await render(<Dashboard />);

    await waitFor(() => getByText(product.title));
    await fireEvent.press(getByTestId(`add-to-cart-${product.id}`));

    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
