import './globals.css';
import './common.css';
import Providers from '@/contexts/Providers';
import LayoutWrapper from '@/components/LayoutWrapper';
import {GoogleAnalytics} from '@next/third-parties/google';
import {ModalClient} from '@/components/Modal/ModalClient';

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
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
        <ModalClient />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ? process.env.NEXT_PUBLIC_GA_ID : ''} />
    </html>
  );
}
