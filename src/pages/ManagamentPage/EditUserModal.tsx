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
import {
  StyledBoxContainer,
  StyledBoxRole,
  StyledFormGroup,
  StyledSubmitButton,
} from './styles/AddUserModalStyles';
import { LoadingModal } from '../../components/LoadingModal';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
  })
  .required();

interface EditUserModalPropType {
  isModalEditUserOpen: boolean;
  setIsModalEditUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
}

const EditUserModal = ({
  isModalEditUserOpen,
  setIsModalEditUserOpen,
  userId,
}: EditUserModalPropType) => {
  const {
    data: userData,
    // isLoading,
    isFetching,
  } = useGetUserQuery({
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
    name: ' ',
    email: ' ',
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
  }, [reset, userData, isModalEditUserOpen]);

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
    <>
      <Modal
        open={isModalEditUserOpen}
        onClose={() => setIsModalEditUserOpen(false)}
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
            onClick={handleSubmit(onEditUser)}
          >
            {updateUserLoading ? (
              <CircularProgress color="info" size={30} />
            ) : (
              'Edit the user'
            )}
          </StyledSubmitButton>
        </StyledBoxContainer>
      </Modal>
      <LoadingModal isOpen={isFetching} />
    </>
  );
};

export default EditUserModal;
