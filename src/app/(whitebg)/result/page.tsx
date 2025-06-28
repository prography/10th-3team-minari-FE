'use client';

import Spacing from '@/components/Spacing';
import Question from './_components/Question';
import ListRow from './_components/ListRow';
import styles from './page.module.css';
import ArrowBlack from '@/assets/icon/arrow-black.svg';
import KeywordList from './_components/KeywordList';
import AnswerList from './_components/AnswerList';
import Button from '@/components/Button';
import {useAnswer} from '@/hooks/queries/useAnswer';

const ReharsalResultPage = () => {
  const {data: answer} = useAnswer(6);

  return (
    <div className={styles.wrapper}>
      <div className={styles.core}>
        <Question answer={answer} />

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

          <AnswerList answer={answer} />
        </div>
      </div>

      <Button theme="white" iconRight={ArrowBlack} border shadow>
        내가 심은 미나리 보러가기
      </Button>
    </div>
  );
};

export default ReharsalResultPage;
