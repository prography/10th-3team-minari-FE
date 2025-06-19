import {getContents} from '@/apis/question';
import React from 'react';

const Contents = async () => {
  const contents = await getContents(3);

  return <>{contents?.result}</>;
};

export default Contents;
