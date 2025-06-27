import Keywrod from '../Keyword';
import {useTag} from '@/hooks/queries/useTag';

const KeywordList = () => {
  const {data: tags} = useTag(6);

  return <>{tags?.result?.map((v, index) => <Keywrod key={`${v}-${index}`}>{v}</Keywrod>)}</>;
};

export default KeywordList;
