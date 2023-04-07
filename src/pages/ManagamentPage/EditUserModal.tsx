import { yupResolver } from '@hookform/resolvers/yup';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import { colors } from '../../constants';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../store/apis/UserManagementAPI/userManagementApi';
import { userEditFormData } from './type';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
  })
  .required();

const EditUserModal = ({
  isModalEditUserOpen,
  setIsModalEditUserOpen,
  userId,
}: any) => {
  const { data: userData } = useGetUserQuery({
    userId,
  });

  const [roleChosen, setRoleChosen] = useState({
    user: true,
    admin: false,
  });
  const handleRoleChosen = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoleChosen({
      ...roleChosen,
      [event.target.name]: event.target.checked,
    });
  };

  const [defaultValues, setDefaultValues] = useState({
    name: '',
    email: '',
  });

  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userEditFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (userData) {
      const newDefaultValues = {
        name: userData?.data?.name || '',
        email: userData?.data?.email || '',
      };
      const newRoleChosen = {
        user: userData?.data?.roles.includes('user'),
        admin: userData?.data?.roles.includes('admin'),
      };
      setDefaultValues(newDefaultValues);
      setRoleChosen(newRoleChosen);
      reset(newDefaultValues);
    }
  }, [reset, userData]);

  const onEditUser = async (data: userEditFormData) => {
    const roles = [];
    if (roleChosen.user) {
      roles.push('user');
    }
    if (roleChosen.admin) {
      roles.push('admin');
    }
    if (!roleChosen.user && !roleChosen.admin) {
      roles.push('user');
    }
    try {
      const newUserData = { ...data, roles };
      await updateUser({ ...newUserData, userId }).unwrap();
      toast('Edit User successfully');
      reset({
        name: '',
        email: '',
      });
      setRoleChosen({
        user: true,
        admin: false,
      });
      setIsModalEditUserOpen(false);
    } catch (error) {
      toast.error('Failed to edit question');
      console.log(error);
    }
  };
  return (
    <Modal
      open={isModalEditUserOpen}
      onClose={() => setIsModalEditUserOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          label="Name"
          type="string"
          fullWidth
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message?.toString()}
          sx={{ mb: 2 }}
          autoFocus
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message?.toString()}
          sx={{ mb: 2 }}
          autoFocus
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <FormLabel
            sx={{
              color: colors.black,
            }}
          >
            Roles
          </FormLabel>
          <FormGroup
            sx={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="user"
                  checked={roleChosen.user}
                  onChange={handleRoleChosen}
                />
              }
              label="User"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="admin"
                  checked={roleChosen.admin}
                  onChange={handleRoleChosen}
                />
              }
              label="Admin"
            />
          </FormGroup>
        </Box>
        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            color: colors.white,
            borderRadius: 8,
            marginTop: 4,
            width: '400px',
            alignSelf: 'center',
          }}
          onClick={handleSubmit(onEditUser)}
        >
          {updateUserLoading ? (
            <CircularProgress color="error" size={30} />
          ) : (
            'Edit the user'
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
