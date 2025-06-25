import {createContext, useContext, useMemo, useState} from 'react';

type DeviceType = 'mic' | 'camera';

type ContextType = {
  device: DeviceType | null;
  handleMicClick: () => void;
  handleCameraClick: () => void;
};
const DeviceSelectContext = createContext<ContextType | null>(null);

export const DeviceSelectProvider = ({children}: {children: React.ReactNode}) => {
  const [device, setDevice] = useState<DeviceType | null>(null);

  const handleMicClick = () => {
    setDevice((prev) => {
      if (prev === 'mic') return null;
      else return 'mic';
    });
  };

  const handleCameraClick = () => {
    setDevice((prev) => {
      if (prev === 'camera') return null;
      else return 'camera';
    });
  };

  const value = useMemo(() => ({device, handleMicClick, handleCameraClick}), [device]);

  return <DeviceSelectContext.Provider value={value}>{children}</DeviceSelectContext.Provider>;
};

export const useDeviceSelect = () => {
  const context = useContext(DeviceSelectContext);
  if (!context) {
    throw new Error('DeviceSelectProvider 내부에서 사용해야 합니다.');
  }
  return context;
};
