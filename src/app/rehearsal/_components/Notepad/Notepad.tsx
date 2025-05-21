import {useNotepad} from '@/contexts/NotepadProvider';
import styles from './Notepad.module.css';
import {useState} from 'react';

const Notepad = () => {
  const [note, setNote] = useState('');
  const {open} = useNotepad();

  return (
    <>
      {open && (
        <textarea
          className={`${styles.textarea} body-lg`}
          placeholder="메모를 입력해주세요."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      )}
    </>
  );
};

export default Notepad;
