import React from 'react';
import Typography from '@mui/material/Typography';
import { Props } from './type';
import { colors } from '../../constants';

const CustomText = ({
  children,
  variant = 'subtitle1',
  color = colors.black,
  extraStyles,
}: Props) => {
  return (
    <Typography variant={variant} color={color} sx={extraStyles}>
      {children}
    </Typography>
  );
};

export default CustomText;
