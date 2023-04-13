import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import React from 'react';

const LoadingModal = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <>
      <Backdrop
        sx={{
          color: 'rgba(0,0,0,0.2)',
          zIndex: (theme) => theme.zIndex.modal + 1,
        }}
        open={isOpen}
      >
        <CircularProgress />
      </Backdrop>
    </>
  );
};

export default LoadingModal;
