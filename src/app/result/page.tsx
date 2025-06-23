import Spacing from '@/components/Spacing';
import Question from './_components/Question';
import ListRow from './_components/ListRow';
import styles from './page.module.css';
import ArrowBlack from '@/assets/icon/arrow-black.svg';
import KeywordList from './_components/KeywordList';
import AnswerList from './_components/AnswerList';
import Button from '@/components/Button';
import {getAnswer} from '@/apis/answer';
import {getContents, getTag} from '@/apis/question';

const ReharsalResultPage = async () => {
  const [answer, tags, contents] = await Promise.all([
    getAnswer('1', 6),
    getTag(5),
    getContents(5),
  ]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.core}>
        <Question answer={answer} contents={contents} />

        <div className={styles.list}>
          <ListRow
            title={<ListRow.Title>이런 단어들이 포함되면 좋아요</ListRow.Title>}
            content={
              <ListRow.Contents>
                <KeywordList tags={tags} />
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
