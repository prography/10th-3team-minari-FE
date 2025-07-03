import {useContents} from '@/hooks/queries/useContents';
import {useQuestionId} from '@/hooks/queries/useQuestionId';
import React from 'react';

const Contents = () => {
  const {data: questionId} = useQuestionId();
  const {data} = useContents(questionId ?? 0);

  return <>{data?.result}</>;
};

export default Contents;
