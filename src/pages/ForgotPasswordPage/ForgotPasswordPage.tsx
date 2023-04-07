import React from 'react';
import Box from '@mui/material/Box';
import { colors } from '../../constants';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { CustomText } from '../../components/CustomText';
import { useResetPasswordMutation } from '../../store/apis/AuthAPI/authApi';
import { useAppDispatch } from '../../store';
import { toast } from 'react-toastify';
import { ErrorResponseType } from '../../store/apis/AuthAPI/types';
import { useNavigate } from 'react-router-dom';

interface FormType {
  email: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .lowercase()
      .required('Please insert your email')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Enter the valid email'
      ),
  })
  .required();

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FormType) => {
    try {
      await resetPassword(data).unwrap();
      toast('Please check your email');
      navigate('/');
    } catch (error) {
      const err = error as ErrorResponseType;
      alert(err.data.message);
    }
  };
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          borderRadius: 4,
          width: '50%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomText variant="h3" extraStyles={{ marginTop: 2, mb: 4 }}>
          Reset your password!
        </CustomText>
        <TextField
          variant="standard"
          label="Email"
          type="email"
          fullWidth
          sx={{ marginY: 2 }}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message?.toString()}
        />
        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            color: colors.white,
            width: '100%',
            borderRadius: 8,
            marginTop: 4,
          }}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? <CircularProgress color="error" size={30} /> : 'Submit'}
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
