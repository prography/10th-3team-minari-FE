'use client';

import {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';

export const useCurrentParams = (key: string, defaultParams: string) => {
  const searchParams = useSearchParams();
  const [params, setParams] = useState(defaultParams);

  useEffect(() => {
    const selectedParams = searchParams.get(key);
    if (selectedParams) {
      setParams(selectedParams);
    }
  }, [searchParams, key]);

  return params;
};
