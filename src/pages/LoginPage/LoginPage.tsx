import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Images } from '../../assets';
import { useAppDispatch } from '../../store';
import { useLoginMutation } from '../../store/apis/AuthAPI/authApi';
import { ErrorResponseType } from '../../store/apis/AuthAPI/types';
import { setCredentials } from '../../store/slices/authSlice';
import {
  BoxUpper,
  CustomTextField,
  GridContainer,
  GridUpper,
  HeaderText,
  StyledForgetPasswordButton,
  StyledGridDown,
  StyledImage,
  StyledLoginButton,
  StyledLogoImage,
  StyledRegisterButton,
} from './styles';
import { FormType } from './type';

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
    password: yup
      .string()
      .required('Please insert your password')
      .min(6, 'Password length should be at least 6 characters')
      .max(20, 'Password cannot exceed more than 20 characters'),
  })
  .required();

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormType) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      reset({
        email: '',
        password: '',
      });
      toast('Login successfully!');
    } catch (error) {
      const err = error as ErrorResponseType;
      console.error(err.data.message);
    }
  };
  return (
    <GridContainer
      container
      minHeight="100vh"
      p={{ lg: 4, sm: 2 }}
      spacing={{ lg: 2, sm: 0 }}
    >
      <GridUpper item xs={12} md={6} p={{ lg: 4, sm: 0 }}>
        <BoxUpper>
          <StyledLogoImage src={Images.LOGO} alt="Logo" />
          <HeaderText variant="h5">Welcome back!</HeaderText>
          <HeaderText variant="h5">Please login to your account!</HeaderText>
        </BoxUpper>
        <CustomTextField
          variant="standard"
          label="Email"
          type="email"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message?.toString()}
        />
        <CustomTextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message?.toString()}
        />
        <StyledForgetPasswordButton
          variant="text"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </StyledForgetPasswordButton>

        <StyledLoginButton variant="contained" onClick={handleSubmit(onSubmit)}>
          {isLoading ? <CircularProgress color="info" size={30} /> : 'Login'}
        </StyledLoginButton>

        <StyledRegisterButton
          variant="text"
          onClick={() => navigate('/register')}
        >
          Don't have an account? Sign Up
        </StyledRegisterButton>
      </GridUpper>

      <StyledGridDown item xs={false} sm={12} md={6}>
        <StyledImage src={Images.LOGIN} alt="" />
      </StyledGridDown>
    </GridContainer>
  );
};

export default LoginPage;
