import { Backdrop, Box, styled } from '@mui/material';

export const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
