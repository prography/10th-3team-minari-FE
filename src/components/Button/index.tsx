import styles from './Button.module.css';
import Image, {type StaticImageData} from 'next/image';

type paddingType = 'p-4-12' | 'p-12-16';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  theme?: 'primary' | 'secondary' | 'white' | 'black';
  iconRight?: StaticImageData;
  iconLeft?: StaticImageData;
  border?: boolean;
  loading?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  size?: paddingType;
}

const Button = ({
  children,
  theme = 'primary',
  iconRight,
  iconLeft,
  border,
  rounded,
  loading,
  shadow,
  size = 'p-12-16',
  ...restProps
}: ButtonProps) => {
  const borderValid = border ? '-border' : '';
  const themeClass = `${theme}${borderValid}`;

  return (
    <button
      className={`${styles.button} ${styles[themeClass]} ${rounded && styles.round} ${shadow && styles.shadow} ${styles[size]} label-lg`}
      {...restProps}
    >
      {iconLeft != null ? (
        <Image
          className={loading ? styles.rotation : ''}
          src={iconLeft}
          alt="icon"
          width={24}
          height={24}
        />
      ) : null}
      <div>{children}</div>
      {iconRight != null ? <Image src={iconRight} alt="icon" width={24} height={24} /> : null}
    </button>
  );
};
export default Button;
