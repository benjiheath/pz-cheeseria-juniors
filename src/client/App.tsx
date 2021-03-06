import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
import { Snackbar, SnackbarContent, Toolbar, Typography } from '@material-ui/core';
import RecentPurchases from './RecentPurchases/RecentPurchases';
import GlobalStyle from './globalStyles';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getCheeses = async (): Promise<CartItemType[]> => await (await fetch(`api/cheeses`)).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { data, isLoading, error } = useQuery<CartItemType[]>('cheeses', getCheeses);

  const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) => (item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item));
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Snackbar
          open={snackbarOpen}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
        >
          <SnackbarContent
            style={{
              backgroundColor: 'green',
              display: 'flex',
              justifyContent: 'center',
            }}
            message='Your purchase was successful!'
            data-cy='purchase-snackbar-content'
          />
        </Snackbar>
        <StyledAppBar position='static'>
          <Toolbar>
            <Grid container direction='row' justify='space-between' alignItems='center'>
              <RecentPurchases />

              <HeaderTypography variant='h3' noWrap>
                Welcome to Patient Zero's Cheeseria
              </HeaderTypography>

              <StyledButton onClick={() => setCartOpen(true)} data-cy='open-cart-btn'>
                <Badge badgeContent={getTotalItems(cartItems)} color='error' data-cy='badge-count'>
                  <AddShoppingCartIcon />
                </Badge>

                <Typography variant='subtitle2'>Cart</Typography>
              </StyledButton>
            </Grid>
          </Toolbar>
        </StyledAppBar>

        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            setCartItems={setCartItems}
            setCartOpen={setCartOpen}
            setSnackbarOpen={setSnackbarOpen}
          />
        </Drawer>

        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </>
  );
};

export default App;
