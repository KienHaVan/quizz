import { Box, Button, MobileStepper, Typography, styled } from '@mui/material';
import { colors } from '../../constants';

export const StledBoxWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  position: 'relative',
}));

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  paddingTop: '64px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
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

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '0',
  },
}));

export const StyledBoxAnswers = styled(Box)(({ theme }) => ({
  padding: '40px 0',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignContent: 'center',
  gap: '20px',
  flex: 1,
  position: 'absolute',
  left: '250px',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    display: 'grid',
    gridTemplateColumns: '300px 300px',
    gridGap: '20px',
    position: 'unset',
    left: '0',
    padding: '20px 0',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

export const StyledAnswerButton = styled(Button)(({ theme }) => ({
  display: 'block',
  padding: '32px 16px',
  minWidth: '200px',
  maxWidth: '240px',
  maxHeight: '100px',
  [theme.breakpoints.down('md')]: {
    // width: '100%',
    maxWidth: '360px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '360px',
  },
}));

export const StyledMobileStepper = styled(MobileStepper)(({ theme }) => ({
  padding: '0 50px 20px',
  marginTop: '50px',
  [theme.breakpoints.down('md')]: {
    marginTop: '20px',
  },
}));
