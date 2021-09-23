import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { StyledButton } from '../App.styles';
import { Typography } from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import RecentPurchasesDrawer from './Drawer';
import { CartItemType } from '../App';

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
      <StyledButton onClick={handleClick} data-cy='recent-purchases-btn'>
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
