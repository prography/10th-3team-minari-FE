import {createContext, useContext, useEffect, useMemo, useRef, useState} from 'react';

type TimerStateType = 'pending' | 'start' | 'stop' | 'pause';

type ContextType = {
  seconds: number;
  type: TimerStateType;
  handleStart: () => void;
  handleStop: () => void;
  handlePause: () => void;
  handleRestart: () => void;
};

const TimerContext = createContext<ContextType | null>(null);

export const TimerProvider = ({children}: {children: React.ReactNode}) => {
  const [type, setType] = useState<TimerStateType>('pending');
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (type === 'start') {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [type]);

  const handleStart = () => {
    setType('start');
  };

  const handlePause = () => {
    setType('pause');
  };

  const handleStop = () => {
    setType('stop');
    setSeconds(0);
  };

  const handleRestart = () => {
    setSeconds(0);
    setType('start');
  };

  const value = useMemo(
    () => ({
      seconds,
      type,
      handleStart,
      handlePause,
      handleStop,
      handleRestart,
    }),
    [seconds, type],
  );

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error('TimerProvider 내부에서 사용해야 합니다.');
  return context;
};
