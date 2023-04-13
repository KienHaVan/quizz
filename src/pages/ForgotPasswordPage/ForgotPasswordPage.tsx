import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../constants';
import { useResetPasswordMutation } from '../../store/apis/AuthAPI/authApi';
import { ErrorResponseType } from '../../store/apis/AuthAPI/types';
import {
  StyledBox,
  StyledBoxContainer,
  StyledButton,
  StyledTextField,
} from './styles';

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
    <StyledBoxContainer>
      <StyledBox>
        <CustomText variant="h4" extraStyles={{ marginTop: 2, mb: 4 }}>
          Reset your password!
        </CustomText>
        <StyledTextField
          variant="standard"
          label="Email"
          type="email"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message?.toString()}
        />
        <StyledButton variant="contained" onClick={handleSubmit(onSubmit)}>
          {isLoading ? <CircularProgress color="info" size={30} /> : 'Submit'}
        </StyledButton>
      </StyledBox>
    </StyledBoxContainer>
  );
};

export default ForgotPasswordPage;
