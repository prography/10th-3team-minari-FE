import {useModalStore} from '@/stores/modalStore';
import QRCodeModal from '../QRCodeModal';
import Title from './(table)/Title';
import Header from './(table)/Header';
import Body, {type TbType} from './(table)/Body';
import {useCallback, useMemo} from 'react';
import Note from '../Note';
import {NOTE_BUY} from '@/constants/note';
import {useProductsSell} from '@/hooks/queries/useProductsSell';

const BuyTab = () => {
  const {open} = useModalStore();
  const {data} = useProductsSell();

  const initialData = useMemo<TbType[][]>(() => [[{type: 'text', text: ''}]], []);

  const TbBuyDatasMake = useCallback((): TbType[][] => {
    return data
      ? data.map((value) => {
          return [
            {type: 'text', text: '씨앗'},
            {type: 'text', text: `${value.quantity}개`},
            {type: 'text', text: `${value.realPrice}원`},
            {type: 'text-red', text: `${value.message}`},
            {
              type: 'button',
              text: `${value.fakePrice}원`,
              onClick: () => {
                open(<QRCodeModal />, false, true);
              },
            },
          ];
        })
      : initialData;
  }, [open, data, initialData]);

  return (
    <>
      <Title>씨앗 사기</Title>
      <Header ths={['씨앗', '개수', '가격', '할인', '가격']} />
      {TbBuyDatasMake().map((tbs, idx) => (
        <Body key={idx} tbs={tbs} />
      ))}
      <Note NoteData={NOTE_BUY} />
    </>
  );
};

export default BuyTab;
