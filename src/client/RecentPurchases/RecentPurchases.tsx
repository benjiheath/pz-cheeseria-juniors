import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { StyledButton } from '../App.styles';
import { Typography } from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import RecentPurchasesDrawer from './Drawer';
import { CartItemType } from '../App';

export type StoredPurchase = { id: string; items: CartItemType[] };

const RecentPurchases = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recentPurchasesState, setRecentPurchasesState] = useState<StoredPurchase[]>([]);

  const getRecentPurchases = async (): Promise<StoredPurchase[]> => {
    const res = await (await fetch(`api/purchases`)).json();
    setRecentPurchasesState(res);
    return res;
  };

  const { data, isLoading, refetch } = useQuery<StoredPurchase[]>('purchases', getRecentPurchases, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleClick = async () => {
    setDrawerOpen(true);
    await getRecentPurchases();
    await refetch();
  };

  return (
    <>
      <StyledButton onClick={handleClick} data-cy='recent-purchases-btn'>
        <RestoreIcon />
        <Typography variant='subtitle2'>Recent Purchases</Typography>
      </StyledButton>
      {!isLoading && data && (
        <RecentPurchasesDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          data={recentPurchasesState}
          setRecentPurchasesState={setRecentPurchasesState}
        />
      )}
    </>
  );
};

export default RecentPurchases;
