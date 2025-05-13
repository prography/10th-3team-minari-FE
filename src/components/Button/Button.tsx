import styles from './Button.module.css';
import WhiteArrow from '@/assets/icon/arrow-white.png';
import BlackArrow from '@/assets/icon/arrow-black.svg';
import Refresh from '@/assets/icon/refresh-cw.svg';
import Pause from '@/assets/icon/circle-pause.svg';
import Stop from '@/assets/icon/circle-stop.svg';
import Image from 'next/image';

interface ButtonProps {
  children?: string;
  onClick?: () => void;
  disabled?: boolean;
  iconRight?: string;
  iconLeft?: string;
  bgColor?: string;
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
      default:
        url = '';
        break;
    }
    return url;
  };

  const getColor = (color: string | undefined, type: string) => {
    let bgColor = '';
    let fontColor = '';
    if (props.disabled) {
      bgColor = '#D4D4D4 !important';
      fontColor = '#A3A3A3 !important';
    } else {
      switch (color) {
        case 'white':
          bgColor = '#FFFFFF';
          fontColor = '#525252';
          break;
        case 'black':
          bgColor = '#262626';
          fontColor = '#FFFFFF';
          break;
        case 'gray':
          bgColor = '#FAFAFA';
          fontColor = '#525252';
          break;
        default:
          bgColor = props.bgColor ? props.bgColor : '#FAFAFA';
          fontColor = '#525252';
          break;
      }
    }
    if (type === 'background') {
      return bgColor;
    } else {
      return fontColor;
    }
  };

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${styles.button} label-lg`}
      style={{
        backgroundColor: getColor(props.bgColor, 'background'),
        color: getColor(props.bgColor, 'font'),
        border: props.border ? '1.5px solid #737373' : '',
      }}
    >
      {props.iconLeft && (
        <span>
          <Image src={getIcon(props.iconLeft)} alt="icon" width={24} height={24} />
        </span>
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
