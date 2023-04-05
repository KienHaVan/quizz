import React, { useState } from 'react';
import { Header } from '../../components/Header';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { randomCreatedDate } from '@mui/x-data-grid-generator';
import { useGetAllQuestionsQuery } from '../../store/apis/ManagementAPI/managementApi';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import { QuestionRowType } from './type';

const columns: GridColDef[] = [
  {
    field: 'number',
    headerName: 'Sequence Number',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'title',
    headerName: 'Title of question',
    type: 'string',
    width: 400,
    editable: true,
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
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

const rows: GridRowsProp = [
  {
    id: 1,
    number: 11,
    title: 'Hello from the other side',
    dateCreated: randomCreatedDate(),
    thumbnail: 'hello',
  },
  {
    id: 2,
    number: 12,
    title: 'Hello from the other side',
    dateCreated: randomCreatedDate(),
    thumbnail: 'hello',
  },
  {
    id: 3,
    number: 13,
    title: 'Hello from the other side',
    dateCreated: randomCreatedDate(),
    thumbnail: 'hello',
  },
  {
    id: 4,
    number: 13,
    title: 'Hello from the other side',
    dateCreated: randomCreatedDate(),
    thumbnail: 'hello',
  },
  {
    id: 5,
    number: 13,
    title: 'Hello from the other side',
    dateCreated: randomCreatedDate(),
    thumbnail: 'hello',
  },
];

const ManagementPage = () => {
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
  });
  console.log(
    '🚀 ~ file: ManagementPage.tsx:105 ~ ManagementPage ~ allQuestions:',
    allQuestions
  );
  const [rowCount, setRowCount] = useState(allQuestions.data.total || 0);

  // const responseQuestionsData: GridRowsProp<QuestionRowType> = () => {
  //   if (!allQuestions.data?.result) {
  //     return [];
  //   }
  //   return allQuestions.data?.result.map((question: any) => ({
  //     id: question.id,
  //     number: question.id,
  //     title: question.title,
  //     dateCreated: dayjs(question.createdAt).format('DD/MM/YYYY'),
  //     thumbnail: question.thumbnail_link || '',
  //   }));
  // };

  if (!!error) {
    return <div>Error...</div>;
  }

  return (
    <Box sx={{ minHeight: '100vh', paddingTop: '64px' }}>
      <Header />
      <div style={{ width: '100%', marginTop: '20px', height: 500 }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
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
