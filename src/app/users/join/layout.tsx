import {UserJoinProvider} from '@/contexts/UserJoinProvider';
import styles from './layout.module.css';
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
