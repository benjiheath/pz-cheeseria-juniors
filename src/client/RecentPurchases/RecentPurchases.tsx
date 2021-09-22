import { Typography } from '@material-ui/core';
import React from 'react';
import { StyledButton } from '../App.styles';
import RestoreIcon from '@material-ui/icons/Restore';

const RecentPurchases = () => {
  return (
    <>
      <StyledButton>
        <RestoreIcon />
        <Typography variant='subtitle2'>Recent Purchases</Typography>
      </StyledButton>
    </>
  );
};

export default RecentPurchases;
