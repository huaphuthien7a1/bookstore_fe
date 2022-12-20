import { makeStyles } from '@mui/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCallback, useRef } from 'react';
import ProductCardSkeleton from '../Skeleton/ProductCardSkelection';
import { IProductCard } from '@/interfaces/compontents/card.interface';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { useMutation, useQueryClient } from 'react-query';
import { addToCart } from '@/apis/cart.api';
import LoadingButton from '@mui/lab/LoadingButton';
import authService from '@/services/authService';
import { useRouter } from 'next/router';
import { CART_CLIENT } from '@/constants/queryKeyName';
import { useToast } from '@/hooks/useToast';
import { moneyFormat } from '@/utils/moneyFormat';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles({
  root: {
    '& .MuiCardMedia-root ': { cursor: 'pointer' },
    '& .MuiTypography-h5': { cursor: 'pointer' },
    maxHeight: '350px',
    height: '100%',
    border: '1px solid rgba(0,0,0,0.15)',
  },
  slide: {
    '& .MuiCardMedia-root ': { cursor: 'pointer' },
    '& .MuiTypography-h5': { cursor: 'pointer' },
    height: '252px',
    border: '1px solid rgba(0,0,0,0.15)',
  },
});

const ProductCard: React.FunctionComponent<IProductCard> = ({
  product,
  slideMode = false,
  isLoading = false,
}) => {
  const router = useRouter();
  const imgRef = useRef(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClickItem = useCallback(() => {
    // router.push(`product/${product?.id}`);
    router.push({
      pathname: '/product/[pid]',
      query: { pid: product?.id },
    });
  }, [product, router]);
  const queryClient = useQueryClient();

  const toast = useToast(dispatch, toggleSnackbar);
  const { mutate: addToCartFunc, isLoading: isLoadingAddToCart } = useMutation(
    () => addToCart({ book_id: product?.id, quantity: 1 }),
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

  const handleClickAddToCart = useCallback(() => {
    if (authService.isAuthenticated()) {
      addToCartFunc();
    } else {
      toast({
        type: 'info',
        message: 'Đăng nhập để thêm sản phẩm vào vỏ hàng',
      });
      router.push('/login');
    }
  }, [addToCartFunc, router, toast]);

  if (isLoading) return <ProductCardSkeleton />;
  return (
    <Card className={slideMode ? classes.slide : classes.root}>
      <CardMedia
        sx={{ objectFit: 'contain', padding: '1rem 0' }}
        ref={imgRef}
        component="img"
        height={slideMode ? '150px' : '200px'}
        image={product?.book_image}
        alt={product?.name}
        onClick={handleClickItem}
      />
      <CardContent sx={{ padding: 2, height: '100%' }}>
        <Stack spacing={1} direction="column" alignItems={'space-between'}>
          <Tooltip title={product?.name} placement="top">
            <Typography
              gutterBottom
              variant="h5"
              sx={{
                display: 'inline-block',
                margin: 0,
                fontSize: { xs: slideMode ? '12px' : '14px', sm: '14px' },
                height: '50px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              onClick={handleClickItem}
            >
              {product?.name}
            </Typography>
          </Tooltip>
          {!slideMode && (
            <>
              <Rating
                size="small"
                name="read-only"
                value={4.5}
                readOnly
                precision={0.5}
              />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  gutterBottom
                  fontWeight="bold"
                  component="div"
                  color="#000"
                  fontSize="16px"
                >
                  {moneyFormat(product?.price)} đ
                </Typography>
                <LoadingButton
                  loading={isLoadingAddToCart}
                  variant="contained"
                  sx={{ padding: 0, width: 'fit-content', minWidth: 0 }}
                  onClick={handleClickAddToCart}
                >
                  <ShoppingCartOutlinedIcon
                    fontSize="small"
                    sx={{ margin: '5px 10px' }}
                  />
                </LoadingButton>
              </Stack>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
