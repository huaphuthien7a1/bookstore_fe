import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material';
import { ReactQueryDevtools } from 'react-query/devtools';
import config from '../config';
import Head from 'next/head';
import themes from '../themes';
import { store } from '../store';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import initRequest from '../services/initRequest';
import { AppPropsWithLayout } from '@/interfaces/layout.interface';
import Script from 'next/script';
import * as gtag from '../lib/gtag';
import { useRouter } from 'next/router';

initRequest();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const customization = {
    fontFamily: config?.fontFamily,
    borderRadius: config?.borderRadius,
  };
  const router = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 3,
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
          },
        },
      })
  );
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <title>BOXO shop | Ecommerse-bookstore</title>
        <meta
          name="description"
          content={`Đặt mua sách trực tuyến giá rẻ, giao hàng tận nơi trên toàn quốc, đổi trả miễn phí trong vòng 7 ngày, giao hành nhanh trong nội thành TPHCM`}
        />
        <meta
          property="og:description"
          content={`Đặt mua sách trực tuyến giá rẻ, giao hàng tận nơi trên toàn quốc, đổi trả miễn phí trong vòng 7 ngày, giao hành nhanh trong nội thành TPHCM`}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
       
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-JHCL42N0Q5"
      />
          
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-JHCL42N0Q5', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={themes(customization)}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}
export default MyApp;
