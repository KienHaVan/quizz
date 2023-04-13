import { Box, Button, TextField, styled } from '@mui/material';
import { colors } from '../../constants';

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
}));

export const StyledBoxModal = styled(Box)(({ theme }) => ({
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  backgroundColor: colors.white,
  padding: '32px',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: '8px',
  marginBottom: '8px',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: colors.white,
  width: '100%',
  borderRadius: 8,
  marginTop: '32px',
}));
