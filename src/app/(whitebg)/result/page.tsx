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
import {useQuestionId} from '@/hooks/queries/useQuestionId';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

const ReharsalResultPage = () => {
  const [queryId, setQueryId] = useState<string | null>(null);
  const {data: questionId} = useQuestionId();
  const {data: answer} = useAnswer(queryId ? (Number(queryId) ?? 0) : (questionId ?? 0));
  const router = useRouter();

  let queryStr = '';
  useEffect(() => {
    if (typeof window !== undefined) {
      queryStr = window.location.search.split('=')[1];
      setQueryId(queryStr);
    }
  }, [queryStr]);
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

      <Button
        theme="white"
        iconRight={ArrowBlack}
        border
        shadow
        onClick={() => router.push(`/users/my?tabs=info`)}
      >
        내가 심은 미나리 보러가기
      </Button>
    </div>
  );
};

export default ReharsalResultPage;
