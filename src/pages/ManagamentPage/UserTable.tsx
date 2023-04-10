import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { colors } from '../../constants';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../../store/apis/UserManagementAPI/userManagementApi';
import EditUserModal from './EditUserModal';
import { AllUserResultType, ResponseUsersDataGridRowType } from './type';

const UserTable = ({ userSearch }: { userSearch: string }) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [isModalEditUserOpen, setIsModalEditUserOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [deleteUser] = useDeleteUserMutation();
  const handleDeleteUser = async (userId: number) => {
    try {
      Swal.fire({
        title: 'Do you want to delete?',
        showCancelButton: true,
        confirmButtonText: 'Submit',
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUser({ userId });
          toast('Delete the user successfully.');
        }
      });
    } catch (error) {
      toast.error('Failed to delete user');
      console.log(error);
    }
  };
  const columns: GridColDef[] = [
    {
      field: 'number',
      headerName: 'Sequence',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'roles',
      headerName: 'Roles',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      width: 150,
    },
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 200,
      renderCell: (params) => {
        if (params.row.avatar) {
          return (
            <img
              src={params.row.avatar.toString()}
              alt="thumbnail"
              style={{
                width: 60,
                height: 60,
                padding: '12px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
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
              setIsModalEditUserOpen(true);
              setUserId(+params.id);
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
              handleDeleteUser(+params.id);
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const {
    data: allUsers,
    error,
    isLoading,
    isFetching,
  } = useGetAllUsersQuery({
    page: paginationModel.page + 1,
    size: paginationModel.pageSize,
    keyWord: userSearch,
  });
  const [rowCount, setRowCount] = useState(allUsers?.data?.total || 0);
  useEffect(() => {
    setRowCount((prevRowCount: number) =>
      allUsers?.data?.total !== undefined ? allUsers?.data?.total : prevRowCount
    );
  }, [allUsers?.data?.total]);
  const responseUsersData: GridRowsProp<ResponseUsersDataGridRowType> =
    useMemo(() => {
      if (!allUsers?.data?.result) {
        return [];
      }
      return allUsers?.data?.result.map(
        (user: AllUserResultType, index: number) => ({
          id: user.id,
          number: index + paginationModel.page * paginationModel.pageSize + 1,
          name: user.name,
          email: user.email,
          roles: user.roles.join(', '),
          dateCreated: dayjs(user.created_at).format('DD/MM/YYYY'),
          avatar: user.avatar_link || '',
        })
      );
    }, [
      allUsers?.data?.result,
      paginationModel.page,
      paginationModel.pageSize,
    ]);

  if (!!error) {
    return <div>Error...</div>;
  }
  return (
    <>
      <div style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}>
        <DataGrid
          autoHeight
          columns={columns}
          rows={responseUsersData}
          rowCount={rowCount}
          pageSizeOptions={[5]}
          loading={isLoading || isFetching}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
        />
      </div>
      <EditUserModal
        isModalEditUserOpen={isModalEditUserOpen}
        setIsModalEditUserOpen={setIsModalEditUserOpen}
        userId={userId}
      />
    </>
  );
};

export default UserTable;
