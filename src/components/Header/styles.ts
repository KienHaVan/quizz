import { ListItemButton, styled } from '@mui/material';

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledListItemText = styled(ListItemButton)(({ theme }) => ({
  alignSelf: 'center',
  textAlign: 'center',
  color: 'red',
  fontWeight: '600',
}));
