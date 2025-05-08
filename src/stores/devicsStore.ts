import {getDevices} from '@/utils/device';
import {create} from 'zustand';

export type Device = 'videoInput' | 'audioInput';

type Devices = {
  videoInputDevices: MediaDeviceInfo[];
  audioInputDevices: MediaDeviceInfo[];
};

export type SelectDevice = Record<Device, MediaDeviceInfo | undefined>;

type DeviceStore = {
  devices: Devices;
  selectDevice: SelectDevice;
  setDevices: (devices: Devices) => void;
  setSelectDevice: (type: Device, device: MediaDeviceInfo) => void;
};

export const useDeviceStore = create<DeviceStore>((set) => {
  const fetchAndSetDevices = async () => {
    const devices = await getDevices();
    set({devices});
    set({
      selectDevice: {
        videoInput: devices.videoInputDevices[0],
        audioInput: devices.audioInputDevices[0],
      },
    });
  };

  void fetchAndSetDevices();

  return {
    devices: {videoInputDevices: [], audioInputDevices: []},
    selectDevice: {videoInput: undefined, audioInput: undefined},
    setDevices: (devices) => set({devices}),
    setSelectDevice: (type, device) =>
      set((state) => ({
        selectDevice: {
          ...state.selectDevice,
          [type]: device,
        },
      })),
  };
});
