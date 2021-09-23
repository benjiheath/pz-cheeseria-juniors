import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';
import { Button } from '@material-ui/core';
import React, { useState } from 'react';

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
  const [error, setError] = useState(null);

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  const purchaseHandler = async () => {
    try {
      const res = await fetch('api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });

      if (res.status === 200) {
        setError(null);
        setCartOpen(false);
        setSnackbarOpen(true);
        setCartItems([]);
      } else {
        throw new Error(`${res.status}`);
      }
    } catch (err) {
      setError(err);
      console.error('purchaseHandler error:', err);
    }
  };

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
        data-cy='purchase-btn'
      >
        Purchase
      </Button>
      {error ? <span>There was an problem with your purchase. Please try again.</span> : null}
    </Wrapper>
  );
};

export default Cart;
