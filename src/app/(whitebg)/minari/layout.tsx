import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '미래의 나를 위한 리허설',
};

export default function MinariLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
