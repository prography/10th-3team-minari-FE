import {NOTE_HISTORY} from '@/constants/note';
import Note from '../Note';
import Header from './(table)/Header';
import Title from './(table)/Title';
import {useCallback, useMemo} from 'react';
import type {TbType} from './(table)/Body';
import {useModalStore} from '@/stores/modalStore';
import {useProductsHistory} from '@/hooks/queries/useProductsHistory';
import QRCodeModalRefund from '../QRCodeModal/QRCodeModalRefund';
import Body from './(table)/Body';

const HistoryTab = () => {
  const {open} = useModalStore();
  const {data} = useProductsHistory();

  const initialData = useMemo<TbType[][]>(() => [[{type: 'text', text: ''}]], []);

  const TbBuyDatasMake = useCallback((): TbType[][] => {
    return data
      ? data.map((value) => {
          return [
            {type: 'text', text: `${value.date}`},
            {type: 'text', text: '씨앗'},
            {type: 'text', text: `${value.quantity}개`},
            {type: 'text', text: `${value.category === 'BUY' ? '구매' : '이벤트'}`},
            {
              type: 'badge',
              text: `${value.status === 'DONE' ? '사용 완료' : '사용 대기'}`,
              disabled: value.status === 'DONE',
            },
            {
              type: 'button',
              text: '환불',
              disabled: value.refund,
              onClick: () => {
                open(<QRCodeModalRefund />, false, true);
              },
            },
          ];
        })
      : initialData;
  }, [open, data, initialData]);

  return (
    <>
      <Title>씨앗 히스토리</Title>
      <Header ths={['날짜', '종류', '갯수', '유형', '상태', '환불 여부']} />
      {TbBuyDatasMake().map((tbs, idx) => (
        <Body key={idx} tbs={tbs} />
      ))}
      <Note NoteData={NOTE_HISTORY} />
    </>
  );
};

export default HistoryTab;
