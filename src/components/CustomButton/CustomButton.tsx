import React from 'react';
import Button from '@mui/material/Button';
import { CustomText } from '../CustomText';
import { Props } from './type';
import { colors } from '../../constants';

const CustomButton = ({ variant = 'contained' }: Props) => {
  return (
    <Button variant={variant} sx={{ textTransform: 'none' }}>
      <CustomText
        variant="subtitle1"
        color={
          variant === 'contained'
            ? colors.white
            : variant === 'outlined'
            ? colors.primary
            : colors.primary
        }
      >
        Type 1
      </CustomText>
    </Button>
  );
};

export default CustomButton;
