import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Header } from '../../components/Header';
import { colors } from '../../constants';
import AddQuestionModal from './AddQuestionModal';
import AddUserModal from './AddUserModal';
import QuestionTable from './QuestionTable';
import UserTable from './UserTable';

const ManagementPage = () => {
  const [isModalAddQuestionOpen, setIsModalAddQuestionOpen] = useState(false);
  const [isModalAddUserOpen, setIsModalAddUserOpen] = useState(false);
  const [questionSearch, setQuestionSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  return (
    <Box sx={{ minHeight: '100vh', paddingTop: '64px' }}>
      <Header />
      {/* AddQuestionButton */}
      <Typography variant="h4" sx={{ mt: 2 }}>
        Questions Management
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          marginTop: 2,
          mb: 2,
        }}
      >
        <TextField
          label="Question Search"
          type="string"
          fullWidth
          value={questionSearch}
          onChange={(e) => setQuestionSearch(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            color: colors.white,
            borderRadius: 2,
            height: 56,
          }}
          onClick={() => setIsModalAddQuestionOpen(true)}
        >
          Add New Question
        </Button>
      </Box>
      {/* PopUpAddQuestion */}
      <AddQuestionModal
        isModalAddQuestionOpen={isModalAddQuestionOpen}
        setIsModalAddQuestionOpen={setIsModalAddQuestionOpen}
      />
      {/* Table */}
      <QuestionTable questionSearch={questionSearch} />

      <Typography variant="h4" sx={{ mt: 2 }}>
        User Management
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          marginTop: 2,
          mb: 2,
        }}
      >
        <TextField
          label="User Search"
          type="string"
          fullWidth
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          sx={{
            textTransform: 'none',
            color: colors.white,
            borderRadius: 2,
            height: 56,
          }}
          onClick={() => setIsModalAddUserOpen(true)}
        >
          Add New User
        </Button>
      </Box>
      <AddUserModal
        isModalAddUserOpen={isModalAddUserOpen}
        setIsModalAddUserOpen={setIsModalAddUserOpen}
      />
      <UserTable userSearch={userSearch} />
    </Box>
  );
};
export default ManagementPage;
