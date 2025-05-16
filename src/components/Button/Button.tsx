import styles from './Button.module.css';
import WhiteArrow from '@/assets/icon/arrow-white.png';
import BlackArrow from '@/assets/icon/arrow-black.svg';
import Refresh from '@/assets/icon/refresh-cw.svg';
import Pause from '@/assets/icon/circle-pause.svg';
import Stop from '@/assets/icon/circle-stop.svg';
import Loading from '@/assets/icon/loader-circle.svg';
import Image from 'next/image';

interface ButtonProps {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'primary' | 'secondary' | 'white' | 'black';
  iconRight?: string;
  iconLeft?: string;
  border?: boolean;
}

const Button = (props: ButtonProps) => {
  const getIcon = (icon: string) => {
    let url;
    switch (icon) {
      case 'arrow-white':
        url = WhiteArrow;
        break;
      case 'arrow-black':
        url = BlackArrow;
        break;
      case 'pause':
        url = Pause;
        break;
      case 'refresh':
        url = Refresh;
        break;
      case 'stop':
        url = Stop;
        break;
      case 'loading':
        url = Loading;
        break;
      default:
        url = '';
        break;
    }
    return url;
  };

  const getClassName = () => {
    const type = props.type || 'primary';
    const border = props.border ? '-border' : '';
    return `${type}${border}`;
  };

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${styles.button} ${styles[getClassName()]} label-lg`}
    >
      {props.loading ? (
        <span className={styles.rotation}>
          <Image src={getIcon('loading')} alt="icon" width={24} height={24} />
        </span>
      ) : (
        <>
          {props.iconLeft && (
            <span>
              <Image src={getIcon(props.iconLeft)} alt="icon" width={24} height={24} />
            </span>
          )}
        </>
      )}
      <div>{props.children}</div>
      {props.iconRight && (
        <span>
          <Image src={getIcon(props.iconRight)} alt="icon" width={24} height={24} />
        </span>
      )}
    </button>
  );
};
export default Button;
