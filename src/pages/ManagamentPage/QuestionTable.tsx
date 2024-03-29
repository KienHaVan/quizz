import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { colors } from '../../constants';
import {
  useDeleteQuestionMutation,
  useGetAllQuestionsQuery,
} from '../../store/apis/ManagementAPI/managementApi';
import EditQuestionModal from './EditQuestionModal';
import { AllQuestionType, QuestionRowType } from './type';
import { ImagePreview } from '../../components/ImagePreview';

const QuestionTable = ({
  questionSearch,
  questionOrder,
  questionSort,
}: {
  questionSearch: string;
  questionOrder: string;
  questionSort: string;
}) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const {
    data: allQuestions,
    error,
    isLoading,
    isFetching,
  } = useGetAllQuestionsQuery({
    page: paginationModel.page + 1,
    size: paginationModel.pageSize,
    keyWord: questionSearch,
    order: questionOrder || 'ASC',
    questionOrder: questionSort,
  });
  const [rowCount, setRowCount] = useState(allQuestions?.data?.total || 0);

  useEffect(() => {
    setRowCount((prevRowCount: number) =>
      allQuestions?.data?.total !== undefined
        ? allQuestions?.data?.total
        : prevRowCount
    );
  }, [allQuestions?.data?.total]);

  const responseQuestionsData: GridRowsProp<QuestionRowType> = useMemo(() => {
    if (!allQuestions?.data?.result) {
      return [];
    }

    return allQuestions?.data?.result.map(
      (question: AllQuestionType, index: number) => ({
        id: question.id,
        number: index + paginationModel.page * paginationModel.pageSize + 1,
        title: question.title,
        dateCreated: dayjs(question.createdAt).format('DD/MM/YYYY'),
        thumbnail: question.thumbnail_link || '',
      })
    );
  }, [
    allQuestions?.data?.result,
    paginationModel.page,
    paginationModel.pageSize,
  ]);
  const [deleteQuestion] = useDeleteQuestionMutation();
  const handleDeleteQuestion = (questionId: number) => {
    try {
      Swal.fire({
        title: 'Do you want to delete?',
        showCancelButton: true,
        confirmButtonText: 'Submit',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteQuestion({ questionId }).unwrap();
          toast.success('Delete the question successfully.');
        }
      });
    } catch (error) {
      toast.error('Failed to delete question');
      console.log(error);
    }
  };

  const [isModalEditQuestionOpen, setIsModalEditQuestionOpen] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState(0);

  const columns: GridColDef[] = [
    {
      field: 'number',
      headerName: '#',
      width: 50,
    },
    {
      field: 'title',
      headerName: 'Title of question',
      width: 400,
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      width: 150,
    },
    {
      field: 'thumbnail',
      headerName: 'Thumbnail',
      width: 300,
      renderCell: (params) => {
        if (params.row.thumbnail) {
          return (
            <Button
              onClick={() =>
                setOpenImagePreview({
                  open: true,
                  imageUrl: params.row.thumbnail.toString(),
                })
              }
            >
              <img
                src={params.row.thumbnail.toString()}
                alt="thumbnail"
                style={{
                  width: 60,
                  height: 60,
                  padding: '12px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </Button>
          );
        }
        return <div>No thumbmail</div>;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <IconButton
            sx={{
              color: colors.primary,
            }}
            onClick={() => {
              setIsModalEditQuestionOpen(true);
              setEditQuestionId(+params.id);
            }}
          >
            <BorderColorOutlinedIcon />
          </IconButton>

          <IconButton
            sx={{
              ml: '8px',
              color: 'red',
            }}
            onClick={() => {
              handleDeleteQuestion(+params.id);
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const [openImagePreview, setOpenImagePreview] = useState({
    open: false,
    imageUrl: '',
  });

  if (!!error) {
    return <div>Error...</div>;
  }

  return (
    <>
      <div style={{ width: '100%', marginTop: '20px' }}>
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
      <EditQuestionModal
        isModalEditQuestionOpen={isModalEditQuestionOpen}
        setIsModalEditQuestionOpen={setIsModalEditQuestionOpen}
        editQuestionId={editQuestionId}
      />
      <ImagePreview
        openImagePreview={openImagePreview}
        setOpenImagePreview={setOpenImagePreview}
      />
    </>
  );
};

export default QuestionTable;
