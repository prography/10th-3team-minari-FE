import styles from './TabButton.module.css';

const TabButtonWrapper = ({children}: {children: React.ReactNode}) => {
  return <nav className={styles.nav}>{children}</nav>;
};

export default TabButtonWrapper;
