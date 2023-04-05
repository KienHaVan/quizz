import React from 'react';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import { Header } from '../../components/Header';
import Stack from '@mui/material/Stack';
import { colors } from '../../constants';

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Stack
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <Button
          variant="contained"
          sx={{ width: '300px', color: colors.white }}
          onClick={() => navigate('/play')}
        >
          Play
        </Button>
        <Button
          variant="contained"
          sx={{ width: '300px', color: colors.white }}
          onClick={() => navigate('/management')}
        >
          Manage
        </Button>
      </Stack>
    </>
  );
};

export default AdminPage;
