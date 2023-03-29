import Box from '@mui/material/Box';
import { Images } from '../../assets';
import { CustomText } from '../../components/CustomText';
import { TextInput } from '../../components/TextInput';

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box flex={1} padding={4}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <img src={Images.LOGO} alt="Logo" />
          <CustomText variant="h5" marginTop={2}>
            Welcome back!
          </CustomText>
          <CustomText variant="h5">Please login to your account!</CustomText>
        </Box>
        <Box>
          <TextInput marginTop={30}></TextInput>
        </Box>
      </Box>
      <Box flex={1}></Box>
    </Box>
  );
};

export default LoginPage;
