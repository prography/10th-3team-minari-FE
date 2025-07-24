import {useNotepad} from '@/contexts/NotepadProvider';
import styles from './Notepad.module.css';
import Image from 'next/image';
import Pen from '@/assets/icon/pen-white.svg';

const Notepad = () => {
  const {memo, handleChange} = useNotepad();

  return (
    <div className={styles.wrapper}>
      <span className={`${styles.title} label-lg txt-white`}>
        <Image src={Pen} alt="펜 모양 아이콘" /> 메모
      </span>
      <textarea
        className={`${styles.textarea} body-lg txt-white`}
        placeholder={`이 공간을 컨닝페이퍼처럼 사용해보세요!

※ 작성한 메모는 종료 버튼을 누르면 자동으로 저장돼요.
※ 메모는 1000자까지 쓸 수 있어요.
        `}
        value={memo}
        onChange={handleChange}
      />
    </div>
  );
};

export default Notepad;
