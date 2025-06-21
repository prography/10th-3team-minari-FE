import Spacing from '@/components/Spacing';
import Question from './_components/Question';
import ListRow from './_components/ListRow';
import styles from './page.module.css';
import Image from 'next/image';
import ArrowBlack from '@/assets/icon/arrow-black.svg';
import KeywordList from './_components/KeywordList';
import AnswerList from './_components/AnswerList';

const ReharsalResultPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.core}>
        <Question />

        <div className={styles.list}>
          <ListRow
            title={<ListRow.Title>이런 단어들이 포함되면 좋아요</ListRow.Title>}
            content={
              <ListRow.Contents>
                <KeywordList />
              </ListRow.Contents>
            }
          />
          <Spacing />

          <AnswerList />
        </div>
      </div>

      <button className={`${styles.button} label-lg`}>
        <>내가 심은 미나리 보러가기</>
        <Image src={ArrowBlack} alt="icon" width={24} height={24} />
      </button>
    </div>
  );
};

export default ReharsalResultPage;
