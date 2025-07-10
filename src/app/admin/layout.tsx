import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '어드민',
};

export default function MinariLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
