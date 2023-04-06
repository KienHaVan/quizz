import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { Header } from '../../components/Header';
import { useGetAllQuestionsQuery } from '../../store/apis/ManagementAPI/managementApi';
import { QuestionRowType, formData } from './type';
import Button from '@mui/material/Button';
import { colors } from '../../constants';
import Modal from '@mui/material/Modal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';

const columns: GridColDef[] = [
  {
    field: 'number',
    headerName: 'Sequence Number',
    width: 150,
    editable: true,
  },
  {
    field: 'title',
    headerName: 'Title of question',
    width: 400,
    editable: true,
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    width: 150,
    editable: true,
  },
  {
    field: 'Thumbnail',
    headerName: 'thumbnail',
    width: 400,
    renderCell: (params) =>
      params.value ? (
        <img
          src={params.value}
          alt="thumbnail"
          style={{
            width: 60,
          }}
        />
      ) : (
        <div>No thumbmail</div>
      ),
  },
];

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

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onAddNewQuestion = (data: formData) => {
    console.log(data);
  };

  const {
    data: allQuestions,
    error,
    isLoading,
    isFetching,
  } = useGetAllQuestionsQuery({
    page: paginationModel.page + 1,
    size: paginationModel.pageSize,
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
    return allQuestions?.data?.result.map((question: any) => ({
      id: question.id,
      number: question.id,
      title: question.title,
      dateCreated: dayjs(question.createdAt).format('DD/MM/YYYY'),
      thumbnail: question.thumbnail_link || '',
    }));
  }, [allQuestions?.data?.result]);

  console.log('responseQuestionsData: ', responseQuestionsData);

  if (!!error) {
    return <div>Error...</div>;
  }

  return (
    <Box sx={{ minHeight: '100vh', paddingTop: '64px' }}>
      <Header />
      <Button
        variant="contained"
        sx={{
          textTransform: 'none',
          color: colors.white,
          borderRadius: 8,
          marginTop: 4,
        }}
        onClick={() => setIsModalAddQuestionOpen(true)}
      >
        Add New Question
      </Button>
      <Modal
        open={isModalAddQuestionOpen}
        onClose={() => setIsModalAddQuestionOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label="Title"
            type="string"
            fullWidth
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message?.toString()}
            sx={{ mb: 2 }}
          />
          <TextField
            {...register('thumbnailLink')}
            name="thumbnailLink"
            label="Thumbnail Link"
            fullWidth
            autoComplete="true"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Answer 1"
            type="string"
            fullWidth
            {...register('answer1')}
            error={!!errors.answer1}
            helperText={errors.answer1?.message?.toString()}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Answer 2"
            type="string"
            fullWidth
            {...register('answer2')}
            error={!!errors.answer2}
            helperText={errors.answer2?.message?.toString()}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Answer 3"
            type="string"
            fullWidth
            {...register('answer3')}
            error={!!errors.answer3}
            helperText={errors.answer3?.message?.toString()}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Answer 4"
            type="string"
            fullWidth
            {...register('answer4')}
            error={!!errors.answer4}
            helperText={errors.answer4?.message?.toString()}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              color: colors.white,
              borderRadius: 8,
              marginTop: 4,
            }}
            onClick={handleSubmit(onAddNewQuestion)}
          >
            Add New Question
          </Button>
        </Box>
      </Modal>
      <div style={{ width: '100%', marginTop: '20px', height: 500 }}>
        <DataGrid
          autoHeight
          columns={columns}
          rows={responseQuestionsData}
          rowCount={rowCount}
          pageSizeOptions={[5]}
          loading={isLoading || isFetching}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
        />
      </div>
    </Box>
  );
};

export default ManagementPage;
