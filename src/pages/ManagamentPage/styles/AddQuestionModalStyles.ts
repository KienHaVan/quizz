import { Avatar, Box, Button, FormGroup, styled } from '@mui/material';
import { colors } from '../../../constants';

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  backgroundColor: colors.white,
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '32px',
}));

export const StyledBoxUpper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '12px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '70px',
  height: '70px',
}));

export const StyledUploadButton = styled(Button)(({ theme }) => ({
  height: '56px',
  color: colors.white,
}));

export const StyledBoxMiddle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: '16px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const StyledBoxDown = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '16px',
}));

export const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
}));

export const StyledAddButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: colors.white,
  borderRadius: '32px',
  marginTop: '32px',
  width: '400px',
  alignSelf: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
