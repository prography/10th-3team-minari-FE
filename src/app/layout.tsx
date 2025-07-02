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
