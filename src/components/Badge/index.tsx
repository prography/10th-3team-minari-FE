import type {StaticImageData} from 'next/image';
import Image from 'next/image';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  disabled?: boolean;
  iconRight?: StaticImageData;
  iconLeft?: StaticImageData;
}

const Badge = ({children, disabled, iconRight, iconLeft}: BadgeProps) => {
  return (
    <div className={`${disabled && styles.disabled} ${styles.badge} label-lg`}>
      {iconLeft != null ? <Image src={iconLeft} alt="icon" width={24} height={24} /> : null}
      {children}
      {iconRight != null ? <Image src={iconRight} alt="icon" width={24} height={24} /> : null}
    </div>
  );
};

export default Badge;
