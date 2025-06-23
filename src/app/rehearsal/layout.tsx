import {RehearsalProvider} from '@/contexts/RehearsalProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RehearsalProvider>{children}</RehearsalProvider>;
}
