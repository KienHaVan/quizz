import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Images } from '../../assets';
import { CustomText } from '../../components/CustomText';
import { RegisterForm } from '../../components/RegisterForm';
import { colors } from '../../constants';
import { useAppDispatch } from '../../store';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../store/apis/AuthAPI/authApi';
import { ErrorResponseType } from '../../store/apis/AuthAPI/types';
import { setCredentials } from '../../store/slices/authSlice';
import { FormType } from './type';
import {
  StyledBoxContainer,
  StyledGridDown,
  StyledGridUpper,
  StyledLoginButton,
  StyledSubmitButton,
} from './styles';

const RegisterPage = () => {
  const [registerFn, { isLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FormType) => {
    try {
      await registerFn(data).unwrap();
      toast('Register successfully!');
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
    <Grid
      container
      minHeight="100vh"
      p={{ lg: 4, sm: 2 }}
      spacing={{ lg: 2, sm: 0 }}
    >
      <StyledGridUpper item xs={12} md={6} p={{ lg: 4, sm: 0 }}>
        <StyledBoxContainer>
          <img src={Images.LOGO} alt="Logo" />
          <CustomText variant="h5" extraStyles={{ marginTop: 2 }}>
            Welcome newbie!
          </CustomText>
          <CustomText variant="h5">Please sign up your account!</CustomText>
        </StyledBoxContainer>

        <RegisterForm onHandleSubmit={onSubmit}>
          <StyledSubmitButton variant="contained" type="submit">
            {isLoading || isLoginLoading ? (
              <CircularProgress color="info" size={30} />
            ) : (
              'Register'
            )}
          </StyledSubmitButton>
        </RegisterForm>

        <StyledLoginButton variant="text" onClick={() => navigate('/')}>
          Have an account? Sign in
        </StyledLoginButton>
      </StyledGridUpper>
      <StyledGridDown item xs={false} sm={12} md={6}>
        <img src={Images.LOGIN} alt="" style={{ width: 400 }} />
      </StyledGridDown>
    </Grid>
  );
};

export default RegisterPage;
