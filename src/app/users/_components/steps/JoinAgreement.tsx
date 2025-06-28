'use client';
import Checkbox from '@/components/Checkbox';
import styles from './JoinAgreement.module.css';

import {useUserJoinContext} from '@/contexts/UserJoinProvider';
import {OUT_LINK} from '@/constants/path';

const JoinAgreement = () => {
  // 약관 동의 체크박스
  const {checkItems, checkAll, checkAllHandler, checkAllIndeterminate, checkHandler} =
    useUserJoinContext();

  const onClickAgreement = (no: string) => {
    const link = `AGREEMENTS_${no}`;
    window.open(OUT_LINK[`${link}`]);
  };

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
        <div>
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
          <div onClick={() => onClickAgreement('1')}>약관보기</div>
          <div onClick={() => onClickAgreement('2')}>약관보기</div>
        </div>
      </div>
    </div>
  );
};

export default JoinAgreement;
