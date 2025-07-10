import {RehearsalProvider} from '@/contexts/RehearsalProvider';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '리허설',
};

export default function RehearslLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RehearsalProvider>{children}</RehearsalProvider>;
}
