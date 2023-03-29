import React from 'react';
import Typography from '@mui/material/Typography';
import { Props } from './type';
import { colors } from '../../constants';

const CustomText = ({
  children,
  variant = 'subtitle1',
  color = colors.black,
  marginTop = 0,
}: Props) => {
  return (
    <Typography variant={variant} color={color} marginTop={marginTop}>
      {children}
    </Typography>
  );
};

export default CustomText;
