import {useModalStore} from '@/stores/modalStore';
import QRCodeModal from '../QRCodeModal';
import Title from './(table)/Title';
import Header from './(table)/Header';
import Body, {type TbType} from './(table)/Body';
import {useCallback} from 'react';
import {TB_COUNT, TB_PRICE} from '@/constants/seedTable';

const BuyTab = () => {
  const {open} = useModalStore();

  const discount = 50;
  const day = '2025.07.26';

  const DiscountFiled = (): TbType => {
    if (discount != null && day != null) {
      return {type: 'text-red', text: `${day}까지 ${discount}% 할인`};
    }
    return {type: 'text-disabled', text: `지금은 이벤트가 없습니다`};
  };

  const TbBuyDatasMake = useCallback((): TbType[][] => {
    return Array.from({length: 5}, () => []).map((_, index) => {
      const count = TB_COUNT[index];
      const price = TB_PRICE[index];
      const discountedPrice = price * (1 - discount / 100);

      return [
        {type: 'text', text: '씨앗'},
        {type: 'text', text: `${count}개`},
        {type: 'text', text: `${price}원`},
        DiscountFiled(),
        {
          type: 'button',
          text: `${discountedPrice}원`,
          onClick: () => {
            open(<QRCodeModal />, false, true);
          },
        },
      ];
    });
  }, [open]);

  return (
    <>
      <Title>씨앗 사기</Title>
      <Header ths={['씨앗', '갯수', '가격', '할인', '가격']} />
      {TbBuyDatasMake().map((tbs, idx) => (
        <Body key={idx} tbs={tbs} />
      ))}
    </>
  );
};

export default BuyTab;
