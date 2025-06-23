import {createContext, useContext, useEffect, useMemo, useRef, useState} from 'react';

type VideoStateType = 3 | 2 | 1 | 'START' | 'DONE' | 'PENDING' | 'STOP';

type ContextType = {
  videoState: VideoStateType;
  handleCountStart: () => void;
  handleCountPause: () => void;
  handleCountStop: () => void;
  handleCountRestart: () => void;
};
const VideoStateContext = createContext<ContextType | null>(null);

export const VideoStateProvider = ({children}: {children: React.ReactNode}) => {
  const [videoState, setVideoState] = useState<VideoStateType>('PENDING');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoState === 'DONE') return;

    timeoutRef.current = setTimeout(() => {
      if (videoState === 3) setVideoState(2);
      else if (videoState === 2) setVideoState(1);
      else if (videoState === 1) setVideoState('START');
      else if (videoState === 'START') setVideoState('DONE');
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [videoState]);

  const handleCountStart = () => {
    if (videoState === 'PENDING') {
      setVideoState(3);
    } else if (videoState === 'DONE') return;
  };

  const handleCountPause = () => {
    if (videoState === 'DONE') setVideoState('STOP');
    if (videoState === 'STOP') setVideoState('START');
    else return;
  };

  const handleCountStop = () => {
    setVideoState('PENDING');
  };

  const handleCountRestart = () => {
    setVideoState('PENDING');
  };

  const value = useMemo(
    () => ({
      videoState,
      handleCountStart,
      handleCountPause,
      handleCountStop,
      handleCountRestart,
    }),
    [videoState],
  );

  return <VideoStateContext.Provider value={value}>{children}</VideoStateContext.Provider>;
};

export const useVideoState = () => {
  const context = useContext(VideoStateContext);
  if (!context) {
    throw new Error('VideoStateProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
