import { Box, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ProductCardItem from './ProductCardItem';
import { makeStyles } from '@mui/styles';
import config from '../../../config';
import ProductCardSkeleton from '../Skeleton/ProductCardSkelection';
import CustomNoRowsOverlay from '../../empty/CustomNoRowsOverlay';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    rowGap: '0.2rem',
    flexDirection: 'column',
    borderRadius: config.borderRadius,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  title: (props: any) => ({
    backgroundColor: props?.titleBackground,
    padding: '1rem',
  }),
});

const ProductCardItems = ({
  data,
  title,
  titleIcon,
  titleBackground = '#fff',
  isLoading = false,
  slideToShow = 4,
}: any) => {
  const classes = useStyles({ titleBackground });
  const renderProducts = () => {
    if (isLoading)
      return (
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      );

    return data?.length > 0 ? (
      data.slice(0, slideToShow).map((product: any, index: number) => {
        return <ProductCardItem key={index} product={product} index={index} />;
      })
    ) : (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <CustomNoRowsOverlay />
        <Typography sx={{ textAlign: 'center' }}>Chưa có sản phẩm.</Typography>
      </Box>
    );
  };

  return (
    <section className={classes.container}>
      {title && (
        <Stack className={classes.title} direction={'row'} spacing={1}>
          {titleIcon ? titleIcon : null}
          <Typography fontWeight={'bold'} fontSize={'1rem'} variant={'h5'}>
            {title}
          </Typography>
        </Stack>
      )}
      <Box sx={{ p: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            columnGap: '15px',
            rowGap: '15px',
          }}
        >
          {renderProducts()}
        </div>
      </Box>
    </section>
  );
};

export default ProductCardItems;