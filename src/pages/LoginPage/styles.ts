import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../../constants';

export const GridContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginBottom: '20px',
  },
}));

export const GridUpper = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const BoxUpper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 4,
});

export const StyledLogoImage = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
}));

export const HeaderText = styled(Typography)(({ theme }) => ({
  marginTop: 2,
  [theme.breakpoints.down('md')]: {
    '&.MuiTypography-h5': {
      fontSize: '32px',
      marginBottom: '16px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '&.MuiTypography-h5': {
      fontSize: '24px',
      marginBottom: '16px',
    },
  },
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
  marginTop: '12px',
  marginBottom: '8px',
}));

export const StyledForgetPasswordButton = styled(Button)({
  textTransform: 'none',
  color: colors.gray,
  alignSelf: 'flex-end',
  marginTop: '8px',
  marginBottom: '20px',
  ':hover': {
    bgcolor: 'transparent',
  },
});

export const StyledLoginButton = styled(Button)({
  textTransform: 'none',
  color: colors.white,
  width: '100%',
  borderRadius: 8,
  marginTop: 4,
});
export const StyledRegisterButton = styled(Button)(({ theme }) => ({
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

export const StyledImage = styled('img')({
  width: 400,
});
