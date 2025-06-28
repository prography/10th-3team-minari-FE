import styles from './ProfileCard.module.css';
import Image from 'next/image';
import ProfileMinari from '@/assets/icon/profile-minari.svg';
import Pen from '@/assets/icon/pen-gray.png';

interface ProfileCardProps {
  name: string | undefined;
  domain: string | undefined;
  email: string | undefined;
}
const ProfileCard = ({name, domain, email}: ProfileCardProps) => {
  return (
    <div className={styles.container}>
      <div className="fx">
        <Image src={ProfileMinari} alt="" />
        <div className={styles['text-section']}>
          <div className={styles['title__wrap']}>
            <div className="label-lg txt-white">{name}님</div>
            <div className={styles['edit-profile__button']}>
              <Image src={Pen} alt="" />
              <span className="label-md txt-inverse-gray">프로필 수정</span>
            </div>
          </div>
          <div className="body-md">{domain} | 미나리 0일차</div>
          <div>{email}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
