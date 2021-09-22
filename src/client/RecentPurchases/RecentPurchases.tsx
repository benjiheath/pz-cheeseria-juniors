import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { StyledButton } from '../App.styles';
import RestoreIcon from '@material-ui/icons/Restore';
import RecentPurchasesDrawer from './Drawer';
import { CartItemType } from '../App';
import { useQuery } from 'react-query';

const RecentPurchases = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getRecentPurchases = async (): Promise<CartItemType[]> => await (await fetch(`api/purchases`)).json();

  const { data, isLoading, error } = useQuery<CartItemType[]>('purchases', getRecentPurchases);

  console.log('error:', error);

  console.log('RECENT PURCHASES:', data);

  // const Drawer = () =>
  //   data && data.length > 0 ? (
  //     <RecentPurchasesDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} data={data} />
  //   ) : null;

  return (
    <>
      <StyledButton onClick={() => setDrawerOpen(true)}>
        <RestoreIcon />
        <Typography variant='subtitle2'>Recent Purchases</Typography>
      </StyledButton>
      {!isLoading && (
        <RecentPurchasesDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} data={data} />
      )}
    </>
  );
};

export default RecentPurchases;
