'use client';

import {useTag} from '@/hooks/queries/useTag';
import React from 'react';

const RandomKeyword = () => {
  const {randomKeyword} = useTag(5);

  return <>{randomKeyword}</>;
};

export default RandomKeyword;
