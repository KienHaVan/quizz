import React from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { colors } from '../../constants';

const LoadingPage = () => {
  return (
    <>
      <Backdrop
        open={true}
        sx={{
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h5" sx={{ ml: '12px', color: 'primary' }}>
          LOADING...
        </Typography>
      </Backdrop>
    </>
  );
};

export default LoadingPage;
