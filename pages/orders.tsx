import { useState } from 'react';
import ProductLayout from '@/layout/ProductLayot';
import { Box, Container, Paper } from '@mui/material';
import OrderTitle from '@/components/orders/OrderTitle';
import OrderTable from '@/components/orders/OrderTable';
import useGetListOrder from '@/hooks/client/usetGetListOrder';
import LinearProgress from '@mui/material/LinearProgress';

const OrdersHistory = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetListOrder(page, 10);
  return (
    <ProductLayout>
      <Container maxWidth="md" disableGutters>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Paper
            className="shadow"
            sx={{
              backgroundColor: '#fff',
              px: { xs: 1.5, md: 2 },
              py: { xs: 2, md: 2 },
              mb: { xs: 1, md: 2 },
            }}
          >
            <OrderTitle />
          </Paper>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <OrderTable
              page={page}
              setPage={setPage}
              items={data?.data || []}
              data={data}
            />
          )}
        </Box>
      </Container>
    </ProductLayout>
  );
};
export default OrdersHistory;
