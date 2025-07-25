import {createContext, useContext, useMemo, useState} from 'react';

type ContextType = {
  memo: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const NotepadContext = createContext<ContextType | null>(null);

export const NotepadProvider = ({children}: {children: React.ReactNode}) => {
  const [memo, setMemo] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 1000) {
      setMemo(newValue);
    }
  };

  const value = useMemo(() => ({memo, handleChange}), [memo]);

  return <NotepadContext.Provider value={value}>{children}</NotepadContext.Provider>;
};

export const useNotepad = () => {
  const context = useContext(NotepadContext);
  if (!context) {
    throw new Error('NotepadProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
