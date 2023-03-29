import React from 'react';
import TextField from '@mui/material/TextField';
import { Props } from './type';

const TextInput = ({ label = 'Email Address', ...props }: Props) => {
  return <TextField id="outlined-error" label={label} sx={{ ...props }} />;
};

export default TextInput;
