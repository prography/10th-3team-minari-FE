import Header from './(table)/Header';
import Title from './(table)/Title';

const UsageTab = () => {
  return (
    <>
      <Title>씨앗 사용 내역</Title>
      <Header ths={['날짜', '씨앗', '갯수', '상태', '환불']} />
    </>
  );
};

export default UsageTab;
