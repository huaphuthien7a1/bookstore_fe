import {
  Grid,
  Stack,
  Button,
  Typography,
  Rating,
  Box,
  Skeleton,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { FC, useCallback } from 'react';
import { addToCart } from '@/apis/cart.api';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { LoadingButton } from '@mui/lab';
import Image from 'next/image';
import { IProductInfo } from '@/interfaces/compontents/product.interface';
import { CART_CLIENT } from '@/constants/queryKeyName';
import { useRouter } from 'next/router';

const ProductInfo: FC<IProductInfo> = ({ data, isLoading }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  const { mutate: addToCartFunc, isLoading: isLoadingAddToCart } = useMutation(
    () => addToCart({ book_id: data?.id, quantity: 1 }),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(CART_CLIENT);
        toast({
          type: 'success',
          message: 'Thêm sản phẩm thành công',
        });
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình thêm sản phẩm',
        });
      },
    }
  );

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 1, md: 2 }}
      sx={{ pt: '0 !important', pr: '0 !important', pl: '0 !important' }}
    >
      <Box className="shadow" sx={{ borderRadius: '8px', py: 2, px: 2 }}>
        <Box
          sx={{
            width: { xs: '100%', md: '300px' },
            height: { xs: '100%', md: '100%' },
            borderRadius: '10px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height={'100%'} />
          ) : (
            <Image
              layout={'responsive'}
              width={300}
              height={500}
              src={data?.book_image || ''}
              alt={data?.name}
              style={{ borderRadius: '8px' }}
            />
          )}
        </Box>
      </Box>
      <Box className="shadow" sx={{ width: '100%', borderRadius: '8px' }}>
        <Grid container sx={{ ml: { md: 4, xs: 4 }, pb: 2 }}>
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 1.5 }, py: { xs: 1, md: 1.5 }, mt: 2 }}
          >
            <Typography variant="h3" fontSize="24px" fontWeight="500">
              {data?.name}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 1.5 }, py: { xs: 1, md: 1.5 } }}
          >
            <Stack direction="row" spacing={1}>
              <Rating value={4.5} precision={0.5} readOnly />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 1.5 }, py: { xs: 1, md: 1.5 } }}
          >
            <Typography
              sx={{ fontSize: '32px', color: '#000', fontWeight: 500 }}
            >
              {data?.price} đ
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 0, md: 1.5 }, py: { xs: 1, md: 1.5 } }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ display: 'flex', columnGap: 2, rowGap: 2 }}
            >
              <LoadingButton
                onClick={() => {
                  addToCartFunc();
                }}
                loading={isLoadingAddToCart}
                variant="contained"
                color="secondary"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  columnGap: '8px',
                }}
              >
                <ShoppingCartOutlinedIcon />
                Thêm vào giỏ hàng
              </LoadingButton>
              <Button
                variant="contained"
                onClick={() => {
                  router.push({ pathname: '/cart' });
                }}
              >
                Mua ngay
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default ProductInfo;
