import styles from './ProfileCard.module.css';
import Image from 'next/image';
import ProfileMinari from '@/assets/icon/profile-minari.svg';
import {useUsers} from '@/hooks/queries/useUsers';
import {useConvert} from '@/hooks/useConvert';
import React from 'react';

// import Pen from '@/assets/icon/pen-gray.png';

interface ProfileCardProps {
  domain?: string | undefined;
}

const ProfileCard = ({domain}: ProfileCardProps) => {
  const {data: userData} = useUsers();
  const {useDomainConvert} = useConvert();
  return (
    <div className={styles.container}>
      <div className="fx">
        <Image
          src={userData?.image ? userData?.image : ProfileMinari}
          alt="logo"
          width={40}
          height={40}
          className={styles['user-image']}
        />
        <div className={styles['text-section']}>
          <div className={styles['title__wrap']}>
            <div className="label-lg txt-white">
              {userData?.name}님
              <span className="label-lg txt-inverse-gray mg-left-12">{userData?.uuid}</span>
            </div>
            {/*<div className={styles['edit-profile__button']}>*/}
            {/*  <Image src={Pen} alt="" />*/}
            {/*  <span className="label-md txt-inverse-gray">프로필 수정</span>*/}
            {/*</div>*/}
          </div>
          <div className="body-md">
            {useDomainConvert(userData?.domain ? userData?.domain : domain)} | 미나리{' '}
            {userData?.dayCount}일차
          </div>
          <div className="body-sm">{userData?.email}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
