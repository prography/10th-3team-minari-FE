import {useModalStore} from '@/stores/modalStore';
import QRCodeModal from '../QRCodeModal';
import Title from './(table)/Title';
import Header from './(table)/Header';
import Body, {type TbType} from './(table)/Body';
import {useCallback, useMemo} from 'react';
import Note from '../Note';
import {NOTE_BUY} from '@/constants/note';
import {useProductsSell} from '@/hooks/queries/useProductsSell';
import {useUsers} from '@/hooks/queries/useUsers';

const BuyTab = () => {
  const {open} = useModalStore();
  const {data} = useProductsSell();
  const {data: userData} = useUsers();

  const order = useMemo(
    () => [
      `송금 메모: UUID(${userData?.uuid ?? ''}) 적기!`,
      '토스뱅크 1002-498-076593으로',
      '송금 완료 화면 캡쳐하기!',
      '위 QR 스캔하고 사진 두 개 첨부해 보내기!',
    ],
    [userData],
  );

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
                open({
                  modal: (
                    <QRCodeModal
                      order={order}
                      uuid={userData?.uuid ?? ''}
                      title="원하는 씨앗을 선택하셨나요?"
                      subTitle="최대 1시간 이내로 씨앗을 보내드릴게요."
                    />
                  ),
                  disableBackdropClick: false,
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
