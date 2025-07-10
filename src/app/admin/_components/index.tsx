import React from 'react';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children?: React.ReactNode;
  title?: string;
}
const PageLayout = ({title, children}: PageLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <div className="title-sm">{title}</div>
      <div className="mg-top-24">{children}</div>
    </div>
  );
};

export default PageLayout;
