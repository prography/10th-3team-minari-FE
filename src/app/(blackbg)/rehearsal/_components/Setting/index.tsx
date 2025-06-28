import OptionGroup from './_components/OptionGroup';
import RehearsalHeader from '../RehearsalHeader';
import OnlyVideo from '../Video/OnlyVideo';
import {useTag} from '@/hooks/queries/useTag';
import {QUESTION_ID} from '@/constants/questionId';

const SettingPage = () => {
  const {randomKeyword} = useTag(QUESTION_ID);

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
