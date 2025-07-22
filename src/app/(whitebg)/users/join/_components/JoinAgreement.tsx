'use client';
import Checkbox from '@/components/Checkbox';
import styles from './JoinAgreement.module.css';

import {useUserJoinContext} from '@/contexts/UserJoinProvider';
import {OUT_LINK} from '@/constants/path';

const JoinAgreement = () => {
  // 약관 동의 체크박스
  const {checkItems, checkAll, checkAllHandler, checkAllIndeterminate, checkHandler} =
    useUserJoinContext();

  return (
    <div>
      <Checkbox
        checked={checkAll}
        onChangeCheck={checkAllHandler}
        indeterminate={checkAllIndeterminate}
      >
        필수 항목 전체 동의
      </Checkbox>
      <hr className={styles.divider} />
      <div className={styles['checkbox__wrap']}>
        <div style={{flexShrink: 0}}>
          {checkItems.map((item, index) => (
            <div key={index} className={styles['checkbox__container']}>
              <Checkbox
                id={item.id}
                checked={item.value}
                onChangeCheck={checkHandler}
                required={item.required}
              >
                <span className={styles['checkbox__text']}>{item.label}</span>
              </Checkbox>
            </div>
          ))}
        </div>

        <div className={styles['agreements__wrap']}>
          <a href={OUT_LINK.개인정보_취급방침} target="_blank" rel="noopener noreferrer">
            약관보기
          </a>
          <a href={OUT_LINK.이용약관} target="_blank" rel="noopener noreferrer">
            약관보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default JoinAgreement;
