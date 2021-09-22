import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import { Button } from '@material-ui/core';
import React from 'react';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  setCartItems: (value: [] | CartItemType[]) => void;
  setCartOpen: (value: boolean) => void;
  setSnackbarOpen: (value: boolean) => void;
};

const Cart: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
  setCartItems,
  setCartOpen,
  setSnackbarOpen,
}) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  const purchaseHandler = async () => {
    const res = await fetch('api/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    setCartOpen(false);
    setSnackbarOpen(true);
    setCartItems([]);

    console.log('res:', res);
  };

  console.log('cartItems:', cartItems.length);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Button
        variant='contained'
        color='primary'
        onClick={() => purchaseHandler()}
        disabled={cartItems.length < 1}
      >
        Purchase
      </Button>
    </Wrapper>
  );
};

export default Cart;
