import { Box, Button, FormControl, styled } from '@mui/material';
import { colors } from '../../../constants';

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: '64px',
}));

export const StyledSearchInputBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
  marginTop: '8px',
  marginBottom: '8px',
  [theme.breakpoints.down('sm')]: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridGap: '8px',
  },
}));

export const StyledAddButtonMobile = styled(Button)(({ theme }) => ({
  width: '64px',
  height: '64px',
  backgroundColor: colors.primary,
  borderRadius: '100%',
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: '200px',
  [theme.breakpoints.down('md')]: {
    minWidth: '140px',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '40%',
  },
}));

export const StyledAddButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: colors.white,
  borderRadius: 2,
  height: 56,
  minWidth: '200px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));
