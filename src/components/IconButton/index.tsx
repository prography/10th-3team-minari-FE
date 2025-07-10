import styles from './IconButton.module.css';
import Image, {type StaticImageData} from 'next/image';

type sizeType = 'size-40' | 'size-48';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'primary' | 'secondary' | 'white';
  icon: StaticImageData;
  loading?: boolean;
  size?: sizeType;
}

const IconButton = ({
  icon,
  theme = 'primary',
  loading,
  size = 'size-48',
  ...restProps
}: IconButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[theme]} ${loading ? styles.rotation : ''} ${styles[size]}`}
      {...restProps}
    >
      {icon != null ? <Image src={icon} alt="icon" width={24} height={24} /> : null}
    </button>
  );
};
export default IconButton;
