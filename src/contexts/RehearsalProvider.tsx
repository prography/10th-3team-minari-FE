'use client';

import {createContext, useContext, useMemo, useState} from 'react';

type ContextType = {
  isSetting: boolean;
  handleIsReharsal: () => void;
  handleIsSetting: () => void;
};

const RehearsalContext = createContext<ContextType | null>(null);

export const RehearsalProvider = ({children}: {children: React.ReactNode}) => {
  const [isSetting, setIsSetting] = useState(true);

  const handleIsReharsal = () => {
    setIsSetting(false);
  };

  const handleIsSetting = () => {
    setIsSetting(true);
  };

  const value = useMemo(() => ({isSetting, handleIsReharsal, handleIsSetting}), [isSetting]);

  return <RehearsalContext.Provider value={value}>{children}</RehearsalContext.Provider>;
};

export const useRehearsal = () => {
  const context = useContext(RehearsalContext);
  if (!context) {
    throw new Error('RehearsalProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
