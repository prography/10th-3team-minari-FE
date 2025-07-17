import './globals.css';
import './common.css';
import Providers from '@/contexts/Providers';
import {GoogleAnalytics, GoogleTagManager} from '@next/third-parties/google';
import {ModalClient} from '@/components/Modal/ModalClient';
import {ToastClient} from '@/components/Toast/ToastClient';
import {MediaStreamEndHandler} from '@/components/MediaStreamEndHandler';
import Header from '@/components/Header';
import {TokenExpirationHandler} from '@/components/TokenExpirationHandler';
import Footer from '@/components/Footer';
import type {Metadata} from 'next';
import Script from 'next/script';
import * as process from 'node:process';

export const metadata: Metadata = {
  title: {
    default: '미나리',
    template: '미나리 | %s',
  },
  description: "'미나리'는 미래의 나를 위한 리허설 플랫폼입니다. 기술 면접을 연습해보세요!",
  keywords: '미나리, 미래의 나를 위한 리허설, 기술면접',
  openGraph: {
    title: '미나리 | 미래의 나를 위한 리허설',
    description: '미래를 위해 미나리에서 기술 면접을 준비해보세요.',
    url: 'https://minari-official.com',
    images: [
      {
        url: '/OG.png',
        alt: '미나리 로고',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    icon: [
      {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
      {url: '/favicon-24x24.png', sizes: '24x24', type: 'image/png'},
      {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
      {url: '/favicon-40x40.png', sizes: '40x40', type: 'image/png'},
      {url: '/favicon.ico', type: 'image/x-icon'}, // fallback
    ],
    // apple: '/apple-touch-icon.png', - 180px / 180px 이 없음
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
        <meta
          name="google-adsense-account"
          content={process.env.NEXT_PUBLIC_CA_PUB_ID ? process.env.NEXT_PUBLIC_CA_PUB_ID : ''}
        />
      </head>
      <body>
        <Providers>
          <Header />
          <MediaStreamEndHandler />
          <TokenExpirationHandler />
          {children}
          <Footer />
          <ToastClient />
          <ModalClient />
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ? process.env.NEXT_PUBLIC_GA_ID : ''} />
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GTM_ID ? process.env.NEXT_PUBLIC_GTM_ID : ''}
      />
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_CA_PUB_ID}`}
        crossOrigin="anonymous"
      />
    </html>
  );
}
