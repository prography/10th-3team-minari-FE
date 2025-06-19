'use client';

import {createContext, useContext, useMemo, useState} from 'react';

type ContextType = {
  open: boolean;
  isUploaded: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleIsUpload: () => void;
};
const CompleteModalContext = createContext<ContextType | null>(null);

export const CompleteModalProvider = ({children}: {children: React.ReactNode}) => {
  const [open, setOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIsUpload = () => {
    setIsUploaded(true);
  };

  const value = useMemo(
    () => ({open, isUploaded, handleOpen, handleClose, handleIsUpload}),
    [open, isUploaded],
  );

  return <CompleteModalContext.Provider value={value}>{children}</CompleteModalContext.Provider>;
};

export const useCompleteModal = () => {
  const context = useContext(CompleteModalContext);
  if (!context) {
    throw new Error('CompleteModalProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
