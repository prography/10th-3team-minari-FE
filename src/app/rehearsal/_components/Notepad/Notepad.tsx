'use client';

import {useNotepad} from '@/contexts/NotepadProvider';
import styles from './Notepad.module.css';

const Notepad = () => {
  const {open, memo, handleChange} = useNotepad();

  return (
    <>
      {open && (
        <textarea
          className={`${styles.textarea} body-lg`}
          placeholder="메모를 입력해주세요."
          value={memo}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default Notepad;
