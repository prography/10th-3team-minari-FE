import Keywrod from '../Keyword';
import {useTag} from '@/hooks/queries/useTag';
import {useQuestionId} from '@/hooks/queries/useQuestionId';

const KeywordList = () => {
  const {data: questionId} = useQuestionId();
  const {data: tags} = useTag(questionId ?? 0);

  return <>{tags?.result?.map((v, index) => <Keywrod key={`${v}-${index}`}>{v}</Keywrod>)}</>;
};

export default KeywordList;
