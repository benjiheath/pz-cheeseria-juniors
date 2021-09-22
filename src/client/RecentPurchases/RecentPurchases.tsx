import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { StyledButton } from '../App.styles';
import RestoreIcon from '@material-ui/icons/Restore';
import RecentPurchasesDrawer from './Drawer';

const RecentPurchases = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <StyledButton onClick={() => setDrawerOpen(true)}>
        <RestoreIcon />
        <Typography variant='subtitle2'>Recent Purchases</Typography>
      </StyledButton>
      <RecentPurchasesDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
};

export default RecentPurchases;
