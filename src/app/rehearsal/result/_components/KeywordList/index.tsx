import Keywrod from '../Keyword';
import {getTag} from '@/apis/question';

const KeywordList = async () => {
  const tags = await getTag(5);

  return <>{tags?.result?.map((v, index) => <Keywrod key={`${v}-${index}`}>{v}</Keywrod>)}</>;
};

export default KeywordList;
