import { Box, Button, Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { ChangeEvent, useRef, useState } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Header } from '../../components/Header';
import { LoadingModal } from '../../components/LoadingModal';
import { colors } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  useGetOwnProfileQuery,
  useUploadAvatarMutation,
} from '../../store/apis/UserManagementAPI/userManagementApi';
import { logOut, selectCurrentUser } from '../../store/slices/authSlice';
import EditUserModal from '../ManagamentPage/EditUserModal';
import Swal from 'sweetalert2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const ProfilePage = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalEditUserOpen, setIsModalEditUserOpen] = useState(false);
  const [uploadAvatar, { isLoading: UploadAvatarLoading }] =
    useUploadAvatarMutation();
  const { data, isLoading } = useGetOwnProfileQuery({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadThumbnail = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (!files || !files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append('avatar', files[0]);

    try {
      await toast.promise(() => uploadAvatar(formData).unwrap(), {
        pending: 'Uploading...',
        success: 'Uploaded avatar successfully',
        error: 'Failed to upload avatar',
      });
    } catch (error) {
      toast.error('Faild to upload thumbnail');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  return (
    <Container maxWidth="xs">
      <Header />
      <Box
        sx={{
          paddingTop: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          // alignItems: 'center',
        }}
      >
        <Button component="label">
          <img
            src={
              data?.avatar_link ||
              'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360'
            }
            alt=""
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '100%',
              border: `4px solid ${colors.primary}`,
            }}
          />
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleUploadThumbnail}
            ref={fileInputRef}
          />
        </Button>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" marginTop="8px"></Typography>
          {/* <Button onClick={() => setIsModalEditUserOpen(true)}>
            <BsPencilSquare size={30} />
          </Button> */}
        </Box>
        <Box sx={{ alignSelf: 'center', width: '100%', paddingTop: '16px' }}>
          <Stack spacing={2}>
            <Item>
              <Typography variant="h5" marginTop="8px">
                Name: {data?.name}
              </Typography>
            </Item>
            <Item>
              <Typography variant="h5" marginTop="8px">
                Email: {data?.email}
              </Typography>
            </Item>
          </Stack>
        </Box>
        <Button
          sx={{
            alignSelf: 'center',
            padding: '8px 12px',
            color: colors.white,
            backgroundColor: 'red',
            minWidth: '200px',
            marginTop: '20px',
            '&.css-1okiot6-MuiButtonBase-root-MuiButton-root:hover': {
              backgroundColor: 'rgba(255,0,0,0.6)',
            },
          }}
          variant="contained"
          onClick={() => {
            Swal.fire({
              title: 'Do you want to log out?',
              showCancelButton: true,
              confirmButtonText: 'LogOut',
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(logOut());
                navigate('/');
              }
            });
          }}
        >
          LogOut
        </Button>
      </Box>
      {/* <EditUserModal
        isModalEditUserOpen={isModalEditUserOpen}
        setIsModalEditUserOpen={setIsModalEditUserOpen}
        userId={user?.id || 0}
      /> */}
      <LoadingModal isOpen={isLoading || UploadAvatarLoading} />
    </Container>
  );
};

export default ProfilePage;
