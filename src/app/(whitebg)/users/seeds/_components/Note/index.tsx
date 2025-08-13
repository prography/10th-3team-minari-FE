import {useId} from 'react';
import styles from './Note.module.css';
import LogoText from '@/components/LogoText';

const Note = ({NoteData}: {NoteData: string[]}) => {
  const id = useId();

  return (
    <div className={styles.note_wrapper}>
      <LogoText>유의사항</LogoText>
      <ul className={styles.note_list}>
        {NoteData.map((n, i) => (
          <li key={`${id}_${i}`} className={`txt-disabled lable-sm`}>
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Note;
