import React from 'react';
import TextField from '@mui/material/TextField';
import { Props } from './type';

const TextInput = ({ label = 'Email Address', extraStyles }: Props) => {
  return <TextField id="outlined-error" label={label} sx={extraStyles} />;
};

export default TextInput;
