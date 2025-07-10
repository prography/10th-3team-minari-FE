import './globals.css';
import './common.css';
import Providers from '@/contexts/Providers';
import {GoogleAnalytics} from '@next/third-parties/google';
import {ModalClient} from '@/components/Modal/ModalClient';
import {ToastClient} from '@/components/Toast/ToastClient';
import {MediaStreamEndHandler} from '@/components/MediaStreamEndHandler';
import Header from '@/components/Header';
import {TokenExpirationHandler} from '@/components/TokenExpirationHandler';
import Footer from '@/components/Footer';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: {
    default: '미나리',
    template: '미나리 | %s',
  },
  description: "미래의 나를 위한 리허설 '미나리'에서 기술 면접을 준비해보세요!",
  keywords: '미나리, 미래의 나를 위한 리허설, 기술면접',
  openGraph: {
    title: '미나리 : 미래의 나를 위한 리허설',
    description: '미래의 나를 위해 미나리에서 기술 면접을 준비해보새요.',
    url: 'https://minari-official.com',
    images: [
      {
        url: '@/assets/logo-black.svg',
        alt: '미나리 로고',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: '트위터 카드 제목',
  //   description: '트위터 카드 설명',
  //   images: ['https://example.com/twitter-image.png'],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0"
        />
      </head>
      <body>
        <Providers>
          <Header />
          <MediaStreamEndHandler />
          <TokenExpirationHandler />
          {children}
          <Footer />
        </Providers>
        <ToastClient />
        <ModalClient />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ? process.env.NEXT_PUBLIC_GA_ID : ''} />
    </html>
  );
}
