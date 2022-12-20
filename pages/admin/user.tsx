import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Chip,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import MainCard from '../../components/cards/MainCard';
import SearchAdminSection from '../../components/Header/SearchSection/SearchAdmin';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import CustomNoRowsOverlay from '../../components/empty/CustomNoRowsOverlay';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import config from '../../config';
import MenuActionAdmin from '../../components/menus/MenuActionAdmin';
import CustomChip from '../../components/chip/CustomChip';
import AdminLayout from '../../layout/AdminLayout';
import useGetListUser from '@/hooks/useGetListUser';
const ImageStyle = styled('img')({
  width: '80%',
  borderRadius: 4,
  objectFit: 'cover',
});
const UserManagement = () => {
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [searchContent, setSearchContent] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isFetching, refetch } = useGetListUser(
    page,
    10,
    ['name', 'description'] as any,
    searchContent
  );
  const deleteProduct = useCallback((id: any) => () => {}, []);
  const toggleModalEdit = useCallback((product: any) => {
    setCurrentProduct(product);
  }, []);
  const handleCloseProductModal = useCallback(() => {
    setCurrentProduct(null);
  }, []);
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
      field: 'actions',

      headerName: 'Thao tác',
      description: 'Thao tác',
      width: 80,

      renderCell: (params: any) => {
        return (
          <MenuActionAdmin
            userMode={true}
            id={params?.row?.id}
            deleteCallback={() => deleteProduct(params?.row?.id)}
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
              sx={{
                border: 1,
                borderColor: 'rgba(0, 0, 0, 0.23)',
                borderRadius: `${config.borderRadius}px`,
                '.MuiDataGrid-footerContainer': {
                  display: 'none',
                },
              }}
              disableSelectionOnClick
              autoHeight
              disableColumnMenu
              loading={isLoading || isFetching}
              columns={columns}
              rows={isLoading || isFetching ? [] : data?.data}
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
              sx={{ marginRight: 2 }}
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
    </AdminLayout>
  );
};

export default UserManagement;
