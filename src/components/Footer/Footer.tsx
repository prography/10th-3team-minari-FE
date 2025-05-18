import styles from './Footer.module.css';
import Logo from '@/assets/image/logo_with_text.png';
import Image from 'next/image';
import GithubIcon from '@/assets/icon/github.svg';
import InstagramIcon from '@/assets/icon/instagram.svg';
import UserPenIcon from '@/assets/icon/user-pen.svg';

const Footer = () => {
  const logoButton = (type: string) => {
    let icon;
    switch (type) {
      case 'github':
        icon = GithubIcon;
        break;
      case 'instagram':
        icon = InstagramIcon;
        break;
      case 'user':
        icon = UserPenIcon;
        break;
    }
    return (
      <div className={styles['logo-button__container']}>
        <Image src={icon} alt="icon" width={24} height={24} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Image src={Logo} alt="logo" />
      <div className={styles['logo-button__wrap']}>
        {logoButton('github')}
        {logoButton('instagram')}
        {logoButton('user')}
      </div>
    </div>
  );
};

export default Footer;
