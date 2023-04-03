import React from 'react';
import { useNavigate } from 'react-router';
import { CustomText } from '../../components/CustomText';
import Button from '@mui/material/Button';

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        sx={{ marginTop: 4, alignSelf: 'center' }}
        onClick={() => navigate('/management')}
      >
        Manage
      </Button>
    </>
  );
};

export default AdminPage;
