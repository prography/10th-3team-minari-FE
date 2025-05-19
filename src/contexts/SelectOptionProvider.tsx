import {createContext, useContext, useMemo, useState} from 'react';

type ContextType = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};
const SelectOptionContext = createContext<ContextType | null>(null);

export const SelectOptionProvider = ({children}: {children: React.ReactNode}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const value = useMemo(() => ({open, handleOpen, handleClose}), [open]);

  return <SelectOptionContext.Provider value={value}>{children}</SelectOptionContext.Provider>;
};

export const useSelectOption = () => {
  const context = useContext(SelectOptionContext);
  if (!context) {
    throw new Error('SelectOptionProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
