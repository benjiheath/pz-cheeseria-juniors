import { CircularProgress, Drawer } from '@material-ui/core';
import React, { useState } from 'react';
import { CartItemType } from '../App';
import { Wrapper } from './Drawer.styles';
import RecentPurchaseItem from './RecentPurchaseItem';

interface Props {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  data: CartItemType[];
}

const RecentPurchasesDrawer = ({ drawerOpen, setDrawerOpen, data }: Props) => {
  const handleClose = () => {
    setDrawerOpen(false);
  };

  const items =
    data.length >= 1 ? (
      data.map((item) => <RecentPurchaseItem item={item} key={item.id} />)
    ) : (
      <>No purchases to show</>
    );

  return (
    <Drawer anchor='left' open={drawerOpen} onClose={handleClose}>
      <Wrapper data-cy='recent-purchases-drawer'>
        <h2>Recent Purchases</h2>
        {items}
      </Wrapper>
    </Drawer>
  );
};

export default RecentPurchasesDrawer;
