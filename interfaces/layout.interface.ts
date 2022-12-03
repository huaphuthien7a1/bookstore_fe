import { NextPageWithLayout } from '@/pages/page';
import { AppProps } from 'next/app';

export interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export interface ILayout {
  children: React.ReactNode;
}
