import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { colors } from '../../constants';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateUserMutation } from '../../store/apis/UserManagementAPI/userManagementApi';
import { toast } from 'react-toastify';
import { userFormData } from './type';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  })
  .required();

interface AddUserModalPropType {
  isModalAddUserOpen: boolean;
  setIsModalAddUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserModal = ({
  isModalAddUserOpen,
  setIsModalAddUserOpen,
}: AddUserModalPropType) => {
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [addUser, { isLoading: AddUserLoading }] = useCreateUserMutation();

  const onAddNewUser = async (data: userFormData) => {
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
      await addUser({ ...data, roles }).unwrap();
      toast('Add new user successfully!');
      reset({
        name: '',
        email: '',
        password: '',
      });
      setRoleChosen({
        user: true,
        admin: false,
      });
      setIsModalAddUserOpen(false);
    } catch (error) {
      toast.error('Failed to add User');
      console.log(error);
    }
  };

  return (
    <Modal
      open={isModalAddUserOpen}
      onClose={() => setIsModalAddUserOpen(false)}
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
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message?.toString()}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message?.toString()}
          sx={{ mb: 2 }}
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
          onClick={handleSubmit(onAddNewUser)}
        >
          Add new user
        </Button>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
