'use client';

import {ALL_TIME} from '@/constants/time';
import {createContext, useContext, useEffect, useMemo, useRef, useState} from 'react';

type TimerStateType = 'pending' | 'start' | 'stop' | 'pause';

type ContextType = {
  seconds: number;
  timeState: TimerStateType;
  handleStart: () => void;
  handleStop: () => void;
  handlePause: () => void;
  handleRestart: () => void;
};

const TimerContext = createContext<ContextType | null>(null);

export const TimerProvider = ({children}: {children: React.ReactNode}) => {
  const [timeState, setTimeState] = useState<TimerStateType>('pending');
  const [seconds, setSeconds] = useState(ALL_TIME);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeState === 'start') {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeState]);

  const handleStart = () => {
    setTimeState('start');
  };

  const handlePause = () => {
    if (timeState === 'start') setTimeState('pause');
    else if (timeState === 'pause') setTimeState('start');
    else return;
  };

  const handleStop = () => {
    if (timeState !== 'start') return;
    setTimeState('stop');
    setSeconds(ALL_TIME);
  };

  const handleRestart = () => {
    setTimeState('pending');
    setSeconds(ALL_TIME);
  };

  const value = useMemo(
    () => ({
      seconds,
      timeState,
      handleStart,
      handlePause,
      handleStop,
      handleRestart,
    }),
    [seconds, timeState],
  );

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error('TimerProvider 내부에서 사용해야 합니다.');
  return context;
};
