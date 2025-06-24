import OptionGroup from './_components/OptionGroup';
import RehearsalHeader from '../RehearsalHeader';
import OnlyVideo from '../Video/OnlyVideo';
import {useTag} from '@/hooks/queries/useTag';

const SettingPage = () => {
  const {randomKeyword} = useTag(5);

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

export default SettingPage;
