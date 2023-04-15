import { Box, Button, MobileStepper, Typography, styled } from '@mui/material';
import { colors } from '../../constants';

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  paddingTop: '64px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

export const StyledBoxUpper = styled(Box)(({ theme }) => ({
  marginTop: '16px',
  marginBottom: '16px',
  borderRadius: 8,
  backgroundColor: colors.primary,
  width: '100%',
  padding: '32px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const StyledBoxTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '50%',
  shrink: 0,
  maxHeight: '400px',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: colors.white,
}));

export const StyledBoxImg = styled(Box)(({ theme }) => ({
  width: '50%',
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  height: '300px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const StyledImg = styled('img')(({ theme }) => ({
  width: 300,
  maxHeight: 300,
  borderRadius: 8,
  objectFit: 'cover',
  alignSelf: 'center',
  [theme.breakpoints.down('sm')]: {
    marginTop: '8px',
  },
}));

export const StyledBoxAnswers = styled(Box)(({ theme }) => ({
  padding: '40px 0',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignContent: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    display: 'grid',
    gridTemplateColumns: '300px 300px',
    gridGap: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const StyledAnswerButton = styled(Button)(({ theme }) => ({
  display: 'block',
  padding: '32px 16px',
  minWidth: '200px',
  maxWidth: '360px',
}));

export const StyledMobileStepper = styled(MobileStepper)(({ theme }) => ({
  padding: '0 50px 20px',
  marginTop: 'auto',
  [theme.breakpoints.down('md')]: {
    marginTop: '20px',
  },
}));

export const StyledBoxModal = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: colors.white,
  borderRadius: 8,
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const StyledBoxModalButton = styled(Box)(({ theme }) => ({
  marginTop: '36px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '32px',
}));

export const StyledModalButton = styled(Button)(({ theme }) => ({
  padding: '16px 32px',
  minWidth: '150px',
}));
