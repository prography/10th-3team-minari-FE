'use client';
import styles from './More.module.css';
import {useUserDelete} from '@/hooks/queries/useUserDelete';

const MoreTab = () => {
  const {result, setShouldFetchDelete} = useUserDelete();

  const onClickLogout = () => {};
  const onClickWithdraw = () => {
    setShouldFetchDelete(true);
    console.log(result, 'result');
  };
  return (
    <div className={styles['button-section']}>
      <button className="body-lg txt-disabled" onClick={onClickLogout}>
        로그아웃
      </button>
      <button className="body-lg txt-disabled" onClick={onClickWithdraw}>
        회원탈퇴
      </button>
    </div>
  );
};

export default MoreTab;
