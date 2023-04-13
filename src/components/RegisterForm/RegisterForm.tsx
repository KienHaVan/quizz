import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { StyledTextField } from './styles';
import { FormType } from './type';

const schema = yup
  .object({
    name: yup.string().required('Please insert your name'),
    email: yup
      .string()
      .lowercase()
      .required('Please insert your email')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Enter the valid email'
      ),
    password: yup
      .string()
      .required('Please insert your password')
      .min(6, 'Password length should be at least 6 characters')
      .max(20, 'Password cannot exceed more than 20 characters'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Password does not match'),
  })
  .required();

const RegisterForm = ({
  children,
  onHandleSubmit,
}: {
  children: React.ReactNode;
  onHandleSubmit: (data: FormType) => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const createNewUserSubmit = async (data: FormType) => {
    await onHandleSubmit(data);
    reset({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    });
  };
  return (
    <Box component="form" onSubmit={handleSubmit(createNewUserSubmit)}>
      <StyledTextField
        variant="standard"
        label="Name"
        type="text"
        fullWidth
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message?.toString()}
      />
      <StyledTextField
        variant="standard"
        label="Email"
        type="email"
        fullWidth
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message?.toString()}
      />
      <StyledTextField
        label="Password"
        type="password"
        variant="standard"
        fullWidth
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message?.toString()}
      />
      <StyledTextField
        label="Confirm the Password"
        type="password"
        variant="standard"
        fullWidth
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message?.toString()}
      />
      {children}
    </Box>
  );
};

export default RegisterForm;
