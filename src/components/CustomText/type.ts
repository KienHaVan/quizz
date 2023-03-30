import { SxProps, Theme } from '@mui/material';
export interface Props {
  children?: React.ReactNode;
  variant:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | undefined;
  color?: string;
  extraStyles?: SxProps<Theme>;
}
