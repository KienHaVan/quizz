import { Box, Button, Grid, styled } from '@mui/material';
import { colors } from '../../constants';

export const StyledGridUpper = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 4,
}));

export const StyledSubmitButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: colors.white,
  width: '100%',
  borderRadius: 8,
  marginTop: '28px',
}));

export const StyledLoginButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: colors.black,
  marginTop: '12px',
  alignSelf: 'center',
  textDecoration: 'underline',
  [theme.breakpoints.down('md')]: {
    marginBottom: '20px',
  },
}));

export const StyledGridDown = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.primary,
  borderRadius: 4,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
