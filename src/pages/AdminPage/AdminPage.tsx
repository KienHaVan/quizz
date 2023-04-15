import React from 'react';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import { Header } from '../../components/Header';
import Stack from '@mui/material/Stack';
import { colors } from '../../constants';
import { StyledButton, StyledStackContainer } from './styles';

const AdminPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <StyledStackContainer
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <StyledButton
          variant="contained"
          onClick={() => {
            localStorage.removeItem('listQuestionSubmitted');
            localStorage.removeItem('userPlayingQuestions');
            navigate('/play');
          }}
        >
          Play
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={() => navigate('/management')}
        >
          Manage
        </StyledButton>
      </StyledStackContainer>
    </>
  );
};

export default AdminPage;
