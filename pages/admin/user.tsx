import { useState, useCallback } from 'react';
import { Box, Pagination, Stack } from '@mui/material';
import MainCard from '../../components/cards/MainCard';
import SearchAdminSection from '../../components/Header/SearchSection/SearchAdmin';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import CustomNoRowsOverlay from '../../components/empty/CustomNoRowsOverlay';
import { styled } from '@mui/material/styles';
import config from '../../config';
import MenuActionAdmin from '../../components/menus/MenuActionAdmin';
import CustomChip from '../../components/chip/CustomChip';
import AdminLayout from '../../layout/AdminLayout';
import useGetListUser from '@/hooks/useGetListUser';
import { useMutation } from 'react-query';
import { activeUser, unactiveUser } from '@/apis/user.api';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/useToast';
import { toggleSnackbar } from '@/store/snackbarReducer';
import Switch from '@mui/material/Switch';
import UserModal from '@/components/modals/UserModal';

const ImageStyle = styled('img')({
  width: '80%',
  borderRadius: 4,
  objectFit: 'cover',
});

const UserManagement = () => {
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchContent, setSearchContent] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, refetch } = useGetListUser(
    page,
    10,
    ['name', 'description'] as any,
    searchContent
  );
  const deleteUser = useCallback((id: any) => () => {}, []);
  const toggleModalEdit = useCallback((user: any) => {
    setCurrentUser({ data: user });
  }, []);

  const { mutate: activeUserFunc } = useMutation(
    (data: { user_id: number; role_id: number }) => activeUser(data),
    {
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình chuyển trạng thái',
        });
      },
      onSuccess: () => {
        refetch();
      },
    }
  );
  const { mutate: unactiveUserFunc } = useMutation(
    (data: { user_id: number; role_id: number }) => unactiveUser(data),
    {
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình chuyển trạng thái',
        });
      },
      onSuccess: () => {
        refetch();
      },
    }
  );
  const columns = [
    { field: 'id', headerName: 'ID', description: 'ID', width: 50 },
    {
      field: 'avatar',
      headerName: 'Avatar',
      description: 'Hình nền',
      width: 100,
      renderCell: (params: any) => {
        return <ImageStyle src={params.value} alt={params?.row?.name} />;
      },
    },
    { field: 'name', headerName: 'Họ tên', description: 'Họ tên', flex: 1 },
    { field: 'bio', headerName: 'Mô tả', description: 'Mô tả', flex: 1 },

    { field: 'email', headerName: 'Email', description: 'Email', flex: 1 },
    {
      field: 'role',
      width: 200,
      headerName: 'Phân quyền',
      description: 'Phân quyền',
      renderCell: (params: any) => {
        return (
          <Stack direction="row" spacing={0.5}>
            {params?.row?.roles.map((i: any, _index: number) => (
              <CustomChip key={_index} content={i} type={'default'} />
            ))}
          </Stack>
        );
      },
    },
    {
      field: 'is_active',
      width: 100,
      description: 'Trạng thái của user',
      headerName: 'Trạng thái',
      renderCell: (params: any) => {
        return (
          <Box>
            <Switch
              checked={params?.row?.is_active}
              disabled={params?.row?.roles?.includes('Admin')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.checked) {
                  activeUserFunc({ user_id: params?.row?.id, role_id: 1 });
                } else {
                  unactiveUserFunc({ user_id: params?.row?.id, role_id: 1 });
                }
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
        );
      },
    },
    {
      field: 'actions',

      headerName: 'Thao tác',
      description: 'Thao tác',
      width: 80,

      renderCell: (params: any) => {
        return (
          <MenuActionAdmin
            userMode={true}
            id={params?.row?.id}
            deleteCallback={() => deleteUser(params?.row?.id)}
            editCallback={() => toggleModalEdit(params?.row)}
          />
        );
      },
    },
  ];

  return (
    <AdminLayout>
      <>
        <MainCard title="Danh sách người dùng" darkTitle>
          <Stack
            direction={{ xs: 'column-reverse', sm: 'row' }}
            alignItems={{ xs: 'flex-end', sm: 'center' }}
            justifyContent={{ xs: 'space-between', sm: 'space-between' }}
            spacing={1}
          >
            <SearchAdminSection
              value={searchContent}
              setValue={setSearchContent}
              setPage={setPage}
            />
          </Stack>
          <Box mt={2}>
            <DataGrid
              className="shadow"
              sx={{
                border: 'none !important',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                borderRadius: `${config.borderRadius}px`,
                '.MuiDataGrid-footerContainer': {
                  display: 'none',
                },
              }}
              disableSelectionOnClick
              autoHeight
              disableColumnMenu
              loading={isLoading}
              columns={columns}
              rows={isLoading ? [] : data?.data}
              components={{
                NoRowsOverlay: CustomNoRowsOverlay,
                LoadingOverlay: LinearProgress,
              }}
            />
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1.5 }}
          >
            <Pagination
              className="shadow"
              sx={{ p: 2, borderRadius: '8px' }}
              variant="outlined"
              shape="rounded"
              color="primary"
              count={data?.meta?.last_page || 0}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </Box>
        </MainCard>
      </>
      <UserModal
        open={currentUser !== null}
        currentProduct={currentUser}
        handleClose={() => setCurrentUser(null)}
        refetchAfterClose={refetch}
      />
    </AdminLayout>
  );
};

export default UserManagement;
