import { Box, Button, FormGroup, styled } from '@mui/material';
import { colors } from '../../../constants';

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  backgroundColor: colors.white,
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '32px',
  [theme.breakpoints.down('md')]: {
    width: '70%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));

export const StyledBoxRole = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px',
}));

export const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px',
}));

export const StyledSubmitButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: colors.white,
  borderRadius: '32px',
  marginTop: '32px',
  width: '400px',
  alignSelf: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
