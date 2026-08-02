import { CartContext, ICartContext } from '@/contexts/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render } from '@testing-library/react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../../src/hooks/use-cart';
import { IProduct } from '../../src/types/product';
import { factory } from '../utils/factory';

describe('UseCart Hook', () => {
  it('should be able to add a product to the cart', async () => {
    console.time('factory.attrs');
    const product = await factory.attrs<IProduct>('Product', { quantity: 0 });
    console.timeEnd('factory.attrs');

    console.time('value');
    const setProducts = jest.fn();
    const value: ICartContext = {
      products: [],
      setProducts,
    };
    console.timeEnd('value');

    console.time('Cart');
    const Cart = () => {
      const { addToCart } = useCart();

      return (
        <>
          <View key={product.id}>
            <TouchableOpacity
              testID="add-to-cart"
              onPress={async () => {
                await addToCart(product);
              }}
            >
              <Text>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    };
    console.timeEnd('Cart');

    console.time('render');
    const { getByTestId } = await render(
      <CartContext.Provider value={value}>
        <Cart />
      </CartContext.Provider>,
    );
    console.timeEnd('render');

    console.time('fireEvent.press');
    await fireEvent.press(getByTestId('add-to-cart'));
    console.timeEnd('fireEvent.press');

    console.time('expect');
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
    console.timeEnd('expect');
  });

  it('should be able to increment a product quantity using addToCart', async () => {
    const product = await factory.attrs<IProduct>('Product', { quantity: 1 });

    const setProducts = jest.fn();
    const value: ICartContext = {
      products: [product],
      setProducts,
    };

    const Cart = () => {
      const { addToCart } = useCart();

      return (
        <>
          <View key={product.id}>
            <TouchableOpacity
              testID="add-to-cart"
              onPress={async () => {
                await addToCart(product);
              }}
            >
              <Text>Increment</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    };

    const { getByTestId } = await render(
      <CartContext.Provider value={value}>
        <Cart />
      </CartContext.Provider>,
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
    const value: ICartContext = {
      products: [product],
      setProducts,
    };

    const Cart = () => {
      const { increment } = useCart();

      return (
        <>
          <View key={product.id}>
            <TouchableOpacity
              testID="increment-quantity"
              onPress={async () => {
                await increment(product.id);
              }}
            >
              <Text>Increment</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    };

    const { getByTestId } = await render(
      <CartContext.Provider value={value}>
        <Cart />
      </CartContext.Provider>,
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
    const value: ICartContext = {
      products: [product],
      setProducts,
    };

    const Cart = () => {
      const { decrement } = useCart();

      return (
        <>
          <View key={product.id}>
            <TouchableOpacity
              testID="decrement-quantity"
              onPress={async () => {
                await decrement(product.id);
              }}
            >
              <Text>Decrement</Text>
            </TouchableOpacity>
          </View>
        </>
      );
    };

    const { getByTestId } = await render(
      <CartContext.Provider value={value}>
        <Cart />
      </CartContext.Provider>,
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
