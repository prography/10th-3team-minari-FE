import React from 'react';
import styles from './RehearsalHeader.module.css';

interface RehearsalHeaderProps {
  subtitle: React.ReactNode;
  title: React.ReactNode;
  leftView: React.ReactNode;
}

const RehearsalHeader = ({subtitle, title, leftView}: RehearsalHeaderProps) => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.titles}`}>
        {subtitle}
        {title}
      </div>
      {leftView}
    </div>
  );
};

const Subtitle = ({children}: {children: React.ReactNode}) => {
  return <span className={`${styles.subtitle} body-lg`}>{children}</span>;
};

const Title = ({children}: {children: React.ReactNode}) => {
  return <span className={`${styles.keyword} title-md`}>{children}</span>;
};

RehearsalHeader.Subtitle = Subtitle;
RehearsalHeader.Title = Title;

export default RehearsalHeader;
