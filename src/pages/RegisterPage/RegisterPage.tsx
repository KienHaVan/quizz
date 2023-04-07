import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Images } from '../../assets';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../constants';
import Grid from '@mui/material/Grid';
import { FormType } from './type';
import { ErrorResponseType } from '../../store/apis/AuthAPI/types';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../store/apis/AuthAPI/authApi';
import { useAppDispatch } from '../../store';
import { setCredentials } from '../../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
  })
  .required();

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [registerFn, { isLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FormType) => {
    try {
      await registerFn(data).unwrap();
      toast('Register successfully!');
      reset({
        email: '',
        password: '',
        name: '',
      });
      const result = await Swal.fire({
        title: 'Go to login?',
        showCancelButton: true,
        confirmButtonText: 'Login',
      });
      if (result.isConfirmed) {
        const auth = await login({
          email: data.email,
          password: data.password,
        }).unwrap();
        dispatch(setCredentials(auth));
        navigate('/');
      }
    } catch (error) {
      const err = error as ErrorResponseType;
      console.error(err.data.message);
    }
  };
  return (
    <Grid container height="100vh" p={4} spacing={2}>
      <Grid
        item
        xs={12}
        md={6}
        p={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <img src={Images.LOGO} alt="Logo" />
          <CustomText variant="h5" extraStyles={{ marginTop: 2 }}>
            Welcome newbie!
          </CustomText>
          <CustomText variant="h5">Please sign up your account!</CustomText>
        </Box>
        <TextField
          variant="standard"
          label="Name"
          type="text"
          fullWidth
          sx={{ marginY: 2 }}
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message?.toString()}
        />
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
        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          sx={{ marginBottom: 1 }}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message?.toString()}
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
          {isLoading || isLoginLoading ? (
            <CircularProgress color="error" size={30} />
          ) : (
            'Register'
          )}
        </Button>
        <Link
          to="/"
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <CustomText
            variant="subtitle1"
            extraStyles={{ marginTop: 4, alignSelf: 'center' }}
          >
            Have an account? Sign in
          </CustomText>
        </Link>
      </Grid>
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: colors.primary,
          borderRadius: 4,
        }}
      >
        <img src={Images.LOGIN} alt="" style={{ width: 400 }} />
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
