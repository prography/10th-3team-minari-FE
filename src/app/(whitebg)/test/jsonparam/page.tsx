'use client';

import {useSearchParams, useRouter} from 'next/navigation';
import React, {Suspense, useEffect, useState} from 'react';

const JsonInner = () => {
  const searchParams = useSearchParams();
  const [jsonParam, setJsonParam] = useState<Record<string, string | null>>();
  const router = useRouter();

  useEffect(() => {
    const paramsObj: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
      paramsObj[key] = value;
    }

    if (Object.keys(paramsObj).length === 0) {
      setJsonParam({});
      return;
    }

    setJsonParam(paramsObj);
  }, [searchParams, router]);

  return (
    <div>
      <h1>파라미터에 대한 JOSN</h1>
      <div style={{marginTop: '16px'}}>
        {Object.keys(jsonParam || {}).length === 0
          ? '파라미터가 없습니다.'
          : JSON.stringify(jsonParam, null, 2)}
      </div>
    </div>
  );
};

export default function TestJsonParamPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <JsonInner />
    </Suspense>
  );
}
