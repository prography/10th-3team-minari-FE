import {UserJoinProvider} from '@/contexts/UserJoinProvider';
import styles from './layout.module.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '미나리 가입',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserJoinProvider>
      <div className={styles.wrapper}>
        <div className={styles.container}>{children}</div>
      </div>
    </UserJoinProvider>
  );
}
