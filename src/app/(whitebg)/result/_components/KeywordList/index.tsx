import {QUESTION_ID} from '@/constants/questionId';
import Keywrod from '../Keyword';
import {useTag} from '@/hooks/queries/useTag';

const KeywordList = () => {
  const {data: tags} = useTag(QUESTION_ID);

  return <>{tags?.result?.map((v, index) => <Keywrod key={`${v}-${index}`}>{v}</Keywrod>)}</>;
};

export default KeywordList;
