import {createContext, useContext, useMemo, useState} from 'react';

type ContextType = {
  open: boolean;
  handleOpen: () => void;
};
const NotepadContext = createContext<ContextType | null>(null);

export const NotepadProvider = ({children}: {children: React.ReactNode}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const value = useMemo(() => ({open, handleOpen}), [open]);

  return <NotepadContext.Provider value={value}>{children}</NotepadContext.Provider>;
};

export const useNotepad = () => {
  const context = useContext(NotepadContext);
  if (!context) {
    throw new Error('NotepadProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
