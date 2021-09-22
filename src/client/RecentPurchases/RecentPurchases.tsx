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

  const { data, isLoading, refetch } = useQuery<CartItemType[]>('purchases', getRecentPurchases, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleClick = async () => {
    await getRecentPurchases();
    refetch();
    setDrawerOpen(true);
  };

  return (
    <>
      <StyledButton onClick={handleClick}>
        <RestoreIcon />
        <Typography variant='subtitle2'>Recent Purchases</Typography>
      </StyledButton>
      {!isLoading && data && (
        <RecentPurchasesDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} data={data} />
      )}
    </>
  );
};

export default RecentPurchases;
