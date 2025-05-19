import styles from './Loader.module.css';

const Loader = () => {
  // TODO Loading UI 요청, Loading 상태 전역 적용 여부 확인 필요
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
