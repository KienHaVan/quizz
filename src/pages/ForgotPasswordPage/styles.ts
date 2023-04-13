import { Box, Button, TextField, styled } from '@mui/material';
import { colors } from '../../constants';

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: 4,
  width: '40%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '70%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '32px',
  [theme.breakpoints.down('md')]: {
    width: '70%',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: colors.white,
  width: '50%',
  borderRadius: 8,
  marginTop: 4,
}));
