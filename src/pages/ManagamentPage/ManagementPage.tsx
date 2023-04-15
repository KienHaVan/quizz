import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Header } from '../../components/Header';
import { colors } from '../../constants';
import AddQuestionModal from './AddQuestionModal';
import AddUserModal from './AddUserModal';
import QuestionTable from './QuestionTable';
import UserTable from './UserTable';
import {
  StyledAddButton,
  StyledAddButtonMobile,
  StyledBoxContainer,
  StyledFormControl,
  StyledSearchInputBox,
} from './styles/ManagementPageStyles';

const ManagementPage = () => {
  const [isModalAddQuestionOpen, setIsModalAddQuestionOpen] = useState(false);
  const [isModalAddUserOpen, setIsModalAddUserOpen] = useState(false);
  const [questionSearch, setQuestionSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [questionOrder, setQuestionOrder] = useState('');
  const [questionSort, setQuestionSort] = useState('');
  const [userOrder, setUserOrder] = useState('');
  const [userSort, setUserSort] = useState('');

  const handleChooseQuestionOrder = (event: SelectChangeEvent) => {
    setQuestionOrder(event.target.value as string);
  };
  const handleChooseQuestionSort = (event: SelectChangeEvent) => {
    setQuestionSort(event.target.value as string);
  };

  const handleChooseUserOrder = (event: SelectChangeEvent) => {
    setUserOrder(event.target.value as string);
  };
  const handleChooseUserSort = (event: SelectChangeEvent) => {
    setUserSort(event.target.value as string);
  };

  return (
    <StyledBoxContainer>
      <Header />
      {/* AddQuestionButton */}
      <Typography variant="h4" marginTop={2}>
        Questions Management
      </Typography>
      <StyledSearchInputBox>
        <TextField
          label="Question Search"
          type="string"
          fullWidth
          value={questionSearch}
          onChange={(e) => setQuestionSearch(e.target.value)}
          sx={{ flex: 1 }}
        />
        <StyledAddButtonMobile onClick={() => setIsModalAddQuestionOpen(true)}>
          <Typography variant="h3" color={colors.white}>
            +
          </Typography>
        </StyledAddButtonMobile>
        <StyledFormControl>
          <InputLabel id="demo-simple-select-label">Question Order</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={questionOrder}
            label="Question Order"
            onChange={handleChooseQuestionOrder}
          >
            <MenuItem value={'ASC'}>ASC</MenuItem>
            <MenuItem value={'DESC'}>DESC</MenuItem>
          </Select>
        </StyledFormControl>
        <StyledFormControl>
          <InputLabel id="demo-simple-select-label">Question Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={questionSort}
            label="Question Order"
            onChange={handleChooseQuestionSort}
          >
            <MenuItem value={'id'}>Id</MenuItem>
            <MenuItem value={'title'}>Title</MenuItem>
            <MenuItem value={'createdAt'}>Created Day</MenuItem>
            <MenuItem value={'updatedAt'}>Updated Day</MenuItem>
          </Select>
        </StyledFormControl>
        <StyledAddButton
          variant="contained"
          onClick={() => setIsModalAddQuestionOpen(true)}
        >
          Add New Question
        </StyledAddButton>
      </StyledSearchInputBox>
      {/* PopUpAddQuestion */}
      <AddQuestionModal
        isModalAddQuestionOpen={isModalAddQuestionOpen}
        setIsModalAddQuestionOpen={setIsModalAddQuestionOpen}
      />
      {/* Table */}
      <QuestionTable
        questionSearch={questionSearch}
        questionOrder={questionOrder}
        questionSort={questionSort}
      />

      <Typography variant="h4" marginTop={2}>
        User Management
      </Typography>
      <StyledSearchInputBox>
        <TextField
          label="User Search"
          type="string"
          fullWidth
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          sx={{ flex: 1 }}
        />
        <StyledAddButtonMobile onClick={() => setIsModalAddUserOpen(true)}>
          <Typography variant="h3" color={colors.white}>
            +
          </Typography>
        </StyledAddButtonMobile>
        <StyledFormControl>
          <InputLabel id="demo-simple-select-label">User Order</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userOrder}
            label="User Order"
            onChange={handleChooseUserOrder}
          >
            <MenuItem value={'ASC'}>ASC</MenuItem>
            <MenuItem value={'DESC'}>DESC</MenuItem>
          </Select>
        </StyledFormControl>
        <StyledFormControl>
          <InputLabel id="demo-simple-select-label">User Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userSort}
            label="User Sort"
            onChange={handleChooseUserSort}
          >
            <MenuItem value={'id'}>Id</MenuItem>
            <MenuItem value={'email'}>Email</MenuItem>
            <MenuItem value={'name'}>Name</MenuItem>
            <MenuItem value={'created_at'}>Created Day</MenuItem>
            <MenuItem value={'updated_at'}>Updated Day</MenuItem>
          </Select>
        </StyledFormControl>
        <StyledAddButton
          variant="contained"
          onClick={() => setIsModalAddUserOpen(true)}
        >
          Add New User
        </StyledAddButton>
      </StyledSearchInputBox>
      <AddUserModal
        isModalAddUserOpen={isModalAddUserOpen}
        setIsModalAddUserOpen={setIsModalAddUserOpen}
      />
      <UserTable
        userSearch={userSearch}
        userOrder={userOrder}
        userSort={userSort}
      />
    </StyledBoxContainer>
  );
};
export default ManagementPage;
