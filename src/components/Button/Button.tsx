import styles from './Button.module.css';
import Image, {type StaticImageData} from 'next/image';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  theme?: 'primary' | 'secondary' | 'white' | 'black';
  iconRight?: StaticImageData;
  iconLeft?: StaticImageData;
  border?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  theme = 'primary',
  iconRight,
  iconLeft,
  border,
  loading,
  ...restProps
}: ButtonProps) => {
  const borderValid = border ? '-border' : '';
  const themeClass = `${theme}${borderValid}`;

  return (
    <button className={`${styles.button} ${styles[themeClass]} label-lg`} {...restProps}>
      {iconRight != null ? (
        <Image
          className={loading ? styles.rotation : ''}
          src={iconRight}
          alt="icon"
          width={24}
          height={24}
        />
      ) : null}
      <div>{children}</div>
      {iconLeft != null ? <Image src={iconLeft} alt="icon" width={24} height={24} /> : null}
    </button>
  );
};
export default Button;
