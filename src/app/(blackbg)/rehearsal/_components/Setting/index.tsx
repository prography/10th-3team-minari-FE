import OptionGroup from './_components/OptionGroup';
import RehearsalHeader from '../RehearsalHeader';
import OnlyVideo from '../Video/OnlyVideo';
import {useTag} from '@/hooks/queries/useTag';
import {useQuestionId} from '@/hooks/queries/useQuestionId';

const SettingPage = () => {
  const {data: questionId} = useQuestionId();
  const {randomKeyword} = useTag(questionId ?? 0);

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
