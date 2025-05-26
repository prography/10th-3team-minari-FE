import React from 'react';
import Minari from '@/assets/minari-black.svg';
import Image from 'next/image';
import styles from './ListRow.module.css';

interface ListRowProps {
  title: React.ReactNode;
  content: React.ReactNode;
}

const ListRow = ({title, content}: ListRowProps) => {
  return (
    <div className={styles.wrapper}>
      <>{title}</>
      <>{content}</>
    </div>
  );
};

const Title = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={styles.title}>
      <Image src={Minari} alt="icon" width={18} />
      <span className="title-xs txt-primary">{children}</span>
    </div>
  );
};

const Contents = ({children}: {children: React.ReactNode}) => {
  if (typeof children === 'string')
    return <p className={`${styles.contents} body-lg`}>{children}</p>;

  return <div className={styles.contents_keywords}>{children}</div>;
};

ListRow.Title = Title;
ListRow.Contents = Contents;

export default ListRow;
