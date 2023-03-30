import { SxProps, Theme } from '@mui/material';

export interface Props {
  variant: 'text' | 'contained' | 'outlined' | undefined;
  extraStyles?: SxProps<Theme>;
  children?: React.ReactNode;
}
