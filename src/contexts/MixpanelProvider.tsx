'use client';
import React, {useEffect} from 'react';
import {initMixpanel} from '@/utils/mixpanel';

interface ProvidersProps {
  children: React.ReactNode;
}

const MixpanelProvider = ({children}: ProvidersProps) => {
  useEffect(() => {
    initMixpanel();
  }, []);
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default MixpanelProvider;
