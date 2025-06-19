import RehearsalHeader from '../_components/RehearsalHeader';
import OptionGroup from './_components/OptionGroup';
import OnlyVideo from '../_components/Video/OnlyVideo';
import {getTag} from '@/apis/question';
import {pickRandom} from '@/utils/pickRandom';

const ReharsalSettingPage = async () => {
  const tags = await getTag(3);
  const randomKeyword = pickRandom(tags?.result ?? []);

  return (
    <>
      <RehearsalHeader
        subtitle={<RehearsalHeader.Subtitle>오늘의 미나리 키워드</RehearsalHeader.Subtitle>}
        title={<RehearsalHeader.Title>{randomKeyword}</RehearsalHeader.Title>}
        leftView={<OptionGroup />}
      />
      <OnlyVideo />
    </>
  );
};

export default ReharsalSettingPage;
