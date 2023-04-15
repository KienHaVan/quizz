import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel, FormLabel } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { LoadingModal } from '../../components/LoadingModal';
import { useCreateUserMutation } from '../../store/apis/UserManagementAPI/userManagementApi';
import {
  StyledBoxContainer,
  StyledBoxRole,
  StyledFormGroup,
  StyledSubmitButton,
} from './styles/AddUserModalStyles';
import { userFormData } from './type';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Password does not match'),
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
      handleCloseModalAddUser();
    } catch (error) {
      toast.error('Failed to add User');
      console.log(error);
    }
  };
  const handleCloseModalAddUser = () => {
    reset({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setRoleChosen({
      user: true,
      admin: false,
    });
    setIsModalAddUserOpen(false);
  };

  return (
    <>
      <Modal
        open={isModalAddUserOpen}
        onClose={handleCloseModalAddUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBoxContainer>
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
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message?.toString()}
            sx={{ mb: 2 }}
          />
          <StyledBoxRole>
            <FormLabel>Roles</FormLabel>
            <StyledFormGroup>
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
            </StyledFormGroup>
          </StyledBoxRole>
          <StyledSubmitButton
            variant="contained"
            onClick={handleSubmit(onAddNewUser)}
          >
            Add new user
          </StyledSubmitButton>
        </StyledBoxContainer>
      </Modal>
      <LoadingModal isOpen={AddUserLoading} />
    </>
  );
};

export default AddUserModal;
