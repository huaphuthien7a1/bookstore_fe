import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { AppBar, Box, CssBaseline, useMediaQuery } from '@mui/material';
import Header from '../../components/Header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu, toggleSidebar } from '../../store/sidebarReducer';
import { NextPageWithLayout } from '@/pages/page';
import NavigationScroll from '../NavigationScroll';
import { ILayout } from '@/interfaces/layout.interface';
import dynamic from 'next/dynamic';
import CustomizedSnackbar from '@/components/snackbar/CustomizedSnackbar';
import { Router } from 'next/router';
import LoadingScreen from '@/components/loading/LoadingScreen';

const Footer = dynamic(() => import('../../components/Footer'), { ssr: false });

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }: { theme: any }) => ({
    ...theme?.typography?.mainContent2,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: 0,
    padding: 0,
  })
);

const ProductLayout: NextPageWithLayout<ILayout> = ({
  children,
  hideFooter = false,
}) => {
  const dispatch = useDispatch();
  const theme: any = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const leftDrawerOpened = useSelector((state: any) => state.sidebar.open);
  const [loading, setLoading] = useState(false); //show loading when navigating/loading components
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));
    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true));
      Router.events.off('routeChangeComplete', () => setLoading(false));
      Router.events.off('routeChangeError', () => setLoading(false));
    };
  }, []);
  const handleLeftDrawerToggle = () => {
    dispatch(toggleSidebar());
  };
  useEffect(() => {
    dispatch(setMenu(!matchDownMd));
  }, [dispatch, matchDownMd]);
  return (
    <NavigationScroll>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <CssBaseline />
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            backgroundColor: theme.palette.background.default,
            transition: leftDrawerOpened
              ? theme.transitions.create('width')
              : 'none',
          }}
        >
          <Header
            handleLeftDrawerToggle={handleLeftDrawerToggle}
            hideSidebarIcon
            hideBelowSection
          />
        </AppBar>

        {loading ? <LoadingScreen /> : <Main theme={theme}>{children}</Main>}

        {!hideFooter && <Footer />}
      </Box>
      <CustomizedSnackbar />
    </NavigationScroll>
  );
};

export default ProductLayout;