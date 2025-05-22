import styles from './IconButton.module.css';
import Image, {type StaticImageData} from 'next/image';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'primary' | 'secondary' | 'white';
  icon: StaticImageData;
  loading?: boolean;
}

const IconButton = ({icon, theme = 'primary', loading, ...restProps}: IconButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[theme]} ${loading ? styles.rotation : ''}`}
      {...restProps}
    >
      {icon != null ? <Image src={icon} alt="icon" width={24} height={24} /> : null}
    </button>
  );
};
export default IconButton;
