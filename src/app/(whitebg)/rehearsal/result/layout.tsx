import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '리허설 결과',
};

export default function ResultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
