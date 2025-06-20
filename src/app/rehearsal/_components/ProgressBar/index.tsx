import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number; // 0 ~ 100
}

export default function ProgressBar({value}: ProgressBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.filler} style={{width: `${value}%`}} />
    </div>
  );
}
