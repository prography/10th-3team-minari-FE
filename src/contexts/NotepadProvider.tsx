import {createContext, useContext, useMemo, useState} from 'react';

type ContextType = {
  open: boolean;
  memo: string;
  handleOpen: () => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const NotepadContext = createContext<ContextType | null>(null);

export const NotepadProvider = ({children}: {children: React.ReactNode}) => {
  const [open, setOpen] = useState(false);
  const [memo, setMemo] = useState('');

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMemo(e.target.value);
  };

  const value = useMemo(() => ({open, memo, handleOpen, handleChange}), [open, memo]);

  return <NotepadContext.Provider value={value}>{children}</NotepadContext.Provider>;
};

export const useNotepad = () => {
  const context = useContext(NotepadContext);
  if (!context) {
    throw new Error('NotepadProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
