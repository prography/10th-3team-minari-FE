import {QUESTION_ID} from '@/constants/questionId';
import {useContents} from '@/hooks/queries/useContents';
import React from 'react';

const Contents = () => {
  const {data} = useContents(QUESTION_ID);

  return <>{data?.result}</>;
};

export default Contents;
