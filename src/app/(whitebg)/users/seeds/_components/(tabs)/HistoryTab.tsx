import {NOTE_HISTORY} from '@/constants/note';
import Note from '../Note';
import Header from './(table)/Header';
import Title from './(table)/Title';
import {useCallback, useMemo} from 'react';
import type {TbType} from './(table)/Body';
import {useModalStore} from '@/stores/modalStore';
import {useProductsHistory} from '@/hooks/queries/useProductsHistory';
import Body from './(table)/Body';
import {useUsers} from '@/hooks/queries/useUsers';
import QRCodeModal from '../QRCodeModal';

const HistoryTab = () => {
  const {open} = useModalStore();
  const {data} = useProductsHistory();
  const {data: userData} = useUsers();

  const order = useMemo(
    () => [
      '송금확인증 발급 or 송금내역 캡쳐하기',
      'QR코드를 스캔하고',
      '(1)번의 사진을 보낸 후',
      `UUID/환불요청/씨앗 구매 개수/사용 개수 전송!`,
    ],
    [],
  );

  const initialData = useMemo<TbType[][]>(() => [[{type: 'text', text: ''}]], []);

  const TbBuyDatasMake = useCallback((): TbType[][] => {
    return data
      ? data.map((value) => {
          return [
            {type: 'text', text: `${value.date}`},
            {type: 'text', text: '씨앗'},
            {type: 'text', text: `${value.quantity}개`},
            {type: 'text', text: `${value.remain}개`},
            {
              type: 'text',
              text: `${value.category === 'BUY' ? '구매' : value.category === 'EVENT' ? '이벤트' : '만료'}`,
            },
            {
              type: 'button',
              text: '환불',
              disabled: value.refund,
              onClick: () => {
                open({
                  modal: (
                    <QRCodeModal
                      order={order}
                      uuid={userData?.uuid ?? ''}
                      title="구매 취소/환불이 필요하신가요?"
                      subTitle="구매 후 7일 이내의 미사용 씨앗만 되어요."
                    />
                  ),
                  historyStackPush: true,
                });
              },
            },
          ];
        })
      : initialData;
  }, [open, data, initialData, order, userData]);

  return (
    <>
      <Title>씨앗 히스토리</Title>
      <Header ths={['날짜', '종류', '구매수량', '남은 개수', '유형', '환불 여부']} />
      {TbBuyDatasMake().map((tbs, idx) => (
        <Body key={idx} tbs={tbs} />
      ))}
      <Note NoteData={NOTE_HISTORY} />
    </>
  );
};

export default HistoryTab;
