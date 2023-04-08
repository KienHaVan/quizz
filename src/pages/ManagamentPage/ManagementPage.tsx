import { yupResolver } from '@hookform/resolvers/yup';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { GridRowsProp } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Header } from '../../components/Header';
import { colors } from '../../constants';
import {
  useAddNewAnswerMutation,
  useAddNewQuestionMutation,
  useGetAllQuestionsQuery,
} from '../../store/apis/ManagementAPI/managementApi';
import AddQuestionModal from './AddQuestionModal';
import QuestionTable from './QuestionTable';
import { QuestionRowType, formData } from './type';
import UserTable from './UserTable';
import AddUserModal from './AddUserModal';

const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    answer1: yup.string().required('Answer 1 is required'),
    answer2: yup.string().required('Answer 1 is required'),
    answer3: yup.string().required('Answer 1 is required'),
    answer4: yup.string().required('Answer 1 is required'),
  })
  .required();

const ManagementPage = () => {
  const [isModalAddQuestionOpen, setIsModalAddQuestionOpen] = useState(false);
  const [isModalAddUserOpen, setIsModalAddUserOpen] = useState(false);
  const [questionSearch, setQuestionSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [correctAnswersChosen, setCorrectAnswersChosen] = useState({
    answer1: true,
    answer2: false,
    answer3: false,
    answer4: false,
  });
  const handleCorrectAnswersChosen = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCorrectAnswersChosen({
      ...correctAnswersChosen,
      [event.target.name]: event.target.checked,
    });
  };
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const [addNewQuestion, { isLoading: addNewQuestionLoading }] =
    useAddNewQuestionMutation();

  const [addNewAnswers, { isLoading: addNewAnswersLoading }] =
    useAddNewAnswerMutation();

  const onAddNewQuestion = async (data: formData) => {
    const {
      data: { id: questionId },
    } = await addNewQuestion({
      title: data.title,
      thumbnail_link: data.thumbnailLink || '',
    }).unwrap();

    console.log(data);

    const answers = [
      { content: data.answer1, is_correct: correctAnswersChosen.answer1 },
      { content: data.answer2, is_correct: correctAnswersChosen.answer2 },
      { content: data.answer3, is_correct: correctAnswersChosen.answer3 },
      { content: data.answer4, is_correct: correctAnswersChosen.answer4 },
    ];

    const promises = answers.map((answer) =>
      addNewAnswers({ ...answer, questionId })
    );

    await Promise.all(promises);
    toast('Add new question successuflly!');
    setIsModalAddQuestionOpen(false);
    reset({
      title: '',
      thumbnailLink: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
    });
    setCorrectAnswersChosen({
      answer1: true,
      answer2: false,
      answer3: false,
      answer4: false,
    });
    try {
    } catch (error) {
      toast.error('Failed to add new question');
      console.log(error);
    }
  };

  const {
    data: allQuestions,
    error,
    isLoading,
    isFetching,
  } = useGetAllQuestionsQuery({
    page: paginationModel.page + 1,
    size: paginationModel.pageSize,
    keyWord: questionSearch,
  });

  const [rowCount, setRowCount] = useState(allQuestions?.data?.total || 0);

  useEffect(() => {
    setRowCount((prevRowCount: any) =>
      allQuestions?.data?.total !== undefined
        ? allQuestions?.data?.total
        : prevRowCount
    );
  }, [allQuestions?.data?.total]);

  const responseQuestionsData: GridRowsProp<QuestionRowType> = useMemo(() => {
    if (!allQuestions?.data?.result) {
      return [];
    }
    return allQuestions?.data?.result.map((question: any, index: number) => ({
      id: question.id,
      number: index + paginationModel.page * paginationModel.pageSize + 1,
      title: question.title,
      dateCreated: dayjs(question.createdAt).format('DD/MM/YYYY'),
      thumbnail: question.thumbnail_link || '',
    }));
  }, [
    allQuestions?.data?.result,
    paginationModel.page,
    paginationModel.pageSize,
  ]);

  if (!!error) {
    return <div>Error...</div>;
  }

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
        register={register}
        errors={errors}
        correctAnswersChosen={correctAnswersChosen}
        handleCorrectAnswersChosen={handleCorrectAnswersChosen}
        handleSubmit={handleSubmit}
        onAddNewQuestion={onAddNewQuestion}
        addNewQuestionLoading={addNewQuestionLoading}
        addNewAnswersLoading={addNewAnswersLoading}
      />
      {/* Table */}
      <QuestionTable
        responseQuestionsData={responseQuestionsData}
        rowCount={rowCount}
        isLoading={isLoading}
        isFetching={isFetching}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />

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
      <UserTable userSearch={userSearch} />
      <AddUserModal
        isModalAddUserOpen={isModalAddUserOpen}
        setIsModalAddUserOpen={setIsModalAddUserOpen}
      />
    </Box>
  );
};
export default ManagementPage;
