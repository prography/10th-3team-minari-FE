import styles from './Layout.module.css';

const RestLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default RestLayout;
