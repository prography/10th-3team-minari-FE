import {useId} from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  ths: string[];
}

const Header = ({ths}: HeaderProps) => {
  const id = useId();

  return (
    <div className={styles.wrapper}>
      {ths.map((text, idx) => (
        <span key={`${idx}_${id}`} className={`${styles.th} ${styles[`th${idx + 1}`]}`}>
          {text}
        </span>
      ))}
    </div>
  );
};

export default Header;
