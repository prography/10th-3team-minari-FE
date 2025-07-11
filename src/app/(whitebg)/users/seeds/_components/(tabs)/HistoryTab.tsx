import {NOTE_HISTORY} from '@/constants/note';
import Note from '../Note';
import Header from './(table)/Header';
import Title from './(table)/Title';

const HistoryTab = () => {
  return (
    <>
      <Title>씨앗 히스토리</Title>
      <Header ths={['날짜', '종류', '갯수', '유형', '상태', '환불 여부']} />
      <Note NoteData={NOTE_HISTORY} />
    </>
  );
};

export default HistoryTab;
