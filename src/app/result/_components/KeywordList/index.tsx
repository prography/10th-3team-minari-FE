import type {ApiResponse} from '@/apis/instance/APIClient';
import Keywrod from '../Keyword';

const KeywordList = ({tags}: {tags: ApiResponse<string[]> | null}) => {
  return <>{tags?.result?.map((v, index) => <Keywrod key={`${v}-${index}`}>{v}</Keywrod>)}</>;
};

export default KeywordList;
