'use client';

import styles from './Footer.module.css';
import Logo from '@/assets/image/logo_with_text.svg';
import useTheme from '@/hooks/useTheme';
import Image from 'next/image';
import Spacing from '../Spacing';
import {OUT_LINK} from '@/constants/path';

const Footer = () => {
  const theme = useTheme();

  return (
    <div className={`${styles.wrapper} ${styles[`${theme}`]}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Image src={Logo} alt="logo" />
          <div className={styles.info}>
            <span>Copyright ⓒ Confirme. All Rights Reserved</span>
            <span>사업자등록번호 : 505-67-00852 대표 : 김주하</span>
            <span>
              호스팅서비스 : 컨퍼미 통신판매업 신고번호 : 제2025-경기파주-2477호 사업자 정보 확인
            </span>
            <span>경기도 파주시 미래로 422, 10층 (야당동, 한빛마을 1단지)</span>
            <span>TEL: 010-8518-5507</span>
          </div>
        </div>
        <div className={styles.right}>
          <ul>
            <li className="label-md">안내</li>
            <a href={OUT_LINK.공지사항} target="_blank" rel="noopener noreferrer">
              공지사항
            </a>
            <a href={OUT_LINK.FAQ} target="_blank" rel="noopener noreferrer">
              FAQ
            </a>

            <a href={OUT_LINK.BLOG} target="_blank" rel="noopener noreferrer">
              BLOG
            </a>
          </ul>
          <ul>
            <li className="label-md">문의하기</li>
            <button>help.minari.com</button>
          </ul>
        </div>
      </div>

      <Spacing />

      <div className={styles.bottom}>
        <a href={OUT_LINK.이용약관} target="_blank" rel="noopener noreferrer">
          이용역관
        </a>
        <a href={OUT_LINK.개인정보_취급방침} target="_blank" rel="noopener noreferrer">
          개인정보 취급 방침
        </a>
        <a href={OUT_LINK.환불_정책} target="_blank" rel="noopener noreferrer">
          환불 정책
        </a>
      </div>
    </div>
  );
};

export default Footer;
