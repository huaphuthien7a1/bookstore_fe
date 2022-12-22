import { Box, Container } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import useGetListGenreClient from '../hooks/client/useGetListGenreClient';
import ProductCardItems from '../components/cards/products/ProductCardItems';
import CarouselCustumized from '@/components/carousel/CarouselCustumized';
import HomeLayout from '@/layout/HomeLayout';
import useGetTopSelling from '@/hooks/client/useGetTopSelling';
import ProductCardItemsByGenre from '@/components/cards/products/ProductCartItemsByGenre';

const Home = () => {
  const { data: topSelling, isLoading: isTopSellLoading } = useGetTopSelling();

  const { data: genreData, isLoading: isGenreLoading } = useGetListGenreClient(
    !!topSelling
  );
  const renderGenres = () => {
    if (!isGenreLoading) {
      return (
        genreData &&
        genreData?.data?.slice(0, 4)?.map((genre: any, _index: number) => {
          return (
            <ProductCardItemsByGenre
              key={_index}
              slideToShow={5}
              title={genre?.name}
              titleBackground={'#e8d5f9'}
              genreId={genre?.id}
            />
          );
        })
      );
    }
  };
  return (
    <HomeLayout>
      <Container
        maxWidth="lg"
        sx={{
          display: { xs: 'none', sm: 'block' },

          pt: 2,
          pb: 1,
          px: {
            xs: '8px !important',
            sm: '8px !important',
            md: '16px !important',
          },
        }}
      >
        <CarouselCustumized />
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: '8px', md: '16px' },
          pb: 1,
          mb: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',

            paddingTop: '8px',
            section: {
              borderRadius: '8px !important',
              overflow: 'hidden !important',
            },
          }}
        >
          <ProductCardItems
            slideToShow={5}
            isLoading={isTopSellLoading}
            data={topSelling?.data}
            title="Xu hướng mua sắm"
            titleIcon={<LocalFireDepartmentIcon color="error" />}
            titleBackground="#FCDDEF"
          />

          {renderGenres()}
        </Box>
      </Container>
    </HomeLayout>
  );
};

export default Home;
