import { Button, Stack, styled } from '@mui/material';
import { colors } from '../../constants';

export const StyledStackContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: '300px',
  color: colors.white,
}));
