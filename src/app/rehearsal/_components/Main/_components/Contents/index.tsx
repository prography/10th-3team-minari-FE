import {useContents} from '@/hooks/queries/useContents';
import React from 'react';

const Contents = () => {
  const {data} = useContents(5);

  return <>{data?.result}</>;
};

export default Contents;
