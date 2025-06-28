import Header from './(table)/Header';
import Title from './(table)/Title';

const HistoryTab = () => {
  return (
    <>
      <Title>씨앗 구입 내역</Title>
      <Header ths={['날짜', '씨앗', '갯수', '상태', '거래내역서 발급']} />
    </>
  );
};

export default HistoryTab;
