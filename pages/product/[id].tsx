import { Box, Paper, Stack, Typography, Button } from '@mui/material';
import ProductInfo from '../../components/productdetails/ProductInfo';
import ProductSlides from '../../components/productdetails/ProductSlides';
import useGetListBookDetail from '../../hooks/client/useGetListBookDetail';
import ProductLayout from '../../layout/ProductLayot';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import LoadingScreen from '../../components/loading/LoadingScreen';
import useGetRelativeBook from '@/hooks/client/useGetRelativeBook';

const ProductDetail = () => {
  const router = useRouter();
  const [id, setId] = useState(null);
  const desRef = useRef<HTMLDivElement>(null);
  const [hiddenDescriptionFlag, setHiddenDescriptionFlag] =
    useState<boolean>(false);
  const [hiddenDescription, setHiddenDescription] = useState<boolean>(false);
  const { data, isLoading } = useGetListBookDetail(id, !!id);
  const {
    data: slideData,
    isLoading: isSlideLoading,
    isFetching: isSlideFetching,
  } = useGetRelativeBook(data, !!data);

  const numberOfLine = () => {
    if (desRef?.current) return desRef?.current?.clientHeight / 20;
    return 0;
  };

  useEffect(() => {
    if (router.isReady) {
      setId(router?.query?.id as any);
    }
  }, [router, setId]);

  useEffect(() => {
    if (numberOfLine() > 3 && !hiddenDescriptionFlag) {
      setHiddenDescription(true);
      setHiddenDescriptionFlag(true);
    }
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ProductLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
        <Paper
          sx={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack>
            <Stack direction="row">
              <ProductInfo data={data} isLoading={isLoading} />
            </Stack>
            <Stack
              className="shadow"
              sx={{
                px: { xs: 2, sm: 2 },
                py: { xs: 2, sm: 4 },
                borderRadius: '8px',
                mt: { md: 2, xs: 1 },
              }}
            >
              <Typography
                variant="h3"
                sx={{ py: { xs: 1, md: 1 }, px: { xs: 1, md: 1 } }}
              >
                Th??ng tin s???n ph???m
              </Typography>
              <Stack
                direction="row"
                spacing={{ xs: 2, sm: 4 }}
                sx={{ py: { xs: 1, md: 1 }, px: { xs: 1, md: 1 } }}
              >
                <Stack direction="column" spacing={1}>
                  {' '}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      M?? s??ch
                    </Typography>{' '}
                    <Box>{data?.isbn}</Box> {/* render authors */}
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      T??c gi???
                    </Typography>
                    <Box>
                      {data &&
                        data?.authors.map((author: any, _index: number) => {
                          if (_index === data?.authors.length - 1)
                            return <span key={_index}>{author?.name}</span>;
                          return <span key={_index}>{author?.name}, </span>;
                        })}
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      Nh?? xu???t b???n
                    </Typography>
                    <Box>{data && data?.publisher?.name}</Box>{' '}
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      S??? trang
                    </Typography>
                    <Box>{data?.total_pages}</Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      Th??? lo???i
                    </Typography>
                    {/* render genres */}
                    <Box>
                      {data &&
                        data?.genres.map((genre: any, _index: number) => {
                          if (_index === data?.genres.length - 1)
                            return <span key={_index}>{genre?.name}</span>;
                          return <span key={_index}>{genre?.name}, </span>;
                        })}{' '}
                    </Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      S??? l?????ng c??n l???i
                    </Typography>
                    <Box>{data && data?.available_quantity}</Box>
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <Typography
                      noWrap
                      sx={{ fontWeight: 600, color: '#000', minWidth: 150 }}
                    >
                      M?? t??? s??ch
                    </Typography>
                    <Stack spacing={1}>
                      {' '}
                      <Box
                        sx={
                          hiddenDescription
                            ? {
                                overflow: 'hidden',
                                maxHeight: '60px',
                                lineHeight: '20px',
                              }
                            : {
                                lineHeight: '20px',
                                overflow: 'hidden',
                              }
                        }
                      >
                        {' '}
                        <Box ref={desRef}>
                          {(data && data?.description) || 'Ch??a c?? m?? t???'}
                        </Box>
                      </Box>
                      {desRef?.current &&
                        numberOfLine() > 3 &&
                        data?.description && (
                          <Button
                            onClick={() =>
                              setHiddenDescription(!hiddenDescription)
                            }
                          >
                            {hiddenDescription ? 'Xem th??m' : 'R??t g???n'}
                          </Button>
                        )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
        <Stack direction="column" sx={{ mb: 4 }}>
          <Typography
            className="shadow"
            variant="h3"
            sx={{
              my: 1,
              py: 1,
              px: 2,
              display: 'inline-block',
              width: 'fit-content',
              borderRadius: '8px',
            }}
          >
            S???n ph???m li??n quan{' '}
          </Typography>
          <ProductSlides
            detailData={data}
            slideData={slideData}
            isSlideLoading={isSlideLoading}
            isSlideFetching={isSlideFetching}
          />
        </Stack>
      </Box>
    </ProductLayout>
  );
};

export default ProductDetail;
