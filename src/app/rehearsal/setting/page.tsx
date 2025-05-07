'use client';

import {useEffect, useState} from 'react';
import SelectDeviceBox from './_components/SelectDeviceBox';

const getDevices = async () => {
  const devicesList = await navigator.mediaDevices.enumerateDevices();
  const videoInputDevices = devicesList.filter((device) => device.kind === 'videoinput');
  const audioInputDevices = devicesList.filter((device) => device.kind === 'audioinput');
  return {videoInputDevices, audioInputDevices};
};

type DeviceList = {
  videoInputDevices: MediaDeviceInfo[];
  audioInputDevices: MediaDeviceInfo[];
};

type SelectDevice = {
  videoInput: MediaDeviceInfo | undefined;
  audioInput: MediaDeviceInfo | undefined;
};

const ReharsalSettingPage = () => {
  const [deviceList, setDeviceList] = useState<DeviceList>();
  const [selectDevice, setSelectDevice] = useState<SelectDevice>();

  useEffect(() => {
    const fetchDevices = async () => {
      await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const devices = await getDevices();
      setDeviceList(devices);
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    setSelectDevice(() => ({
      audioInput: deviceList?.audioInputDevices[0],
      videoInput: deviceList?.videoInputDevices[0],
    }));
  }, [deviceList]);

  const handleSelectDevice = (type: 'videoInput' | 'audioInput', device: MediaDeviceInfo) => {
    setSelectDevice((prev) => ({
      audioInput: prev?.audioInput,
      videoInput: prev?.videoInput,
      [type]: device,
    }));
  };

  return (
    <>
      <div style={{display: 'flex', gap: '30px'}}>
        <SelectDeviceBox
          type="videoInput"
          deviceList={deviceList?.videoInputDevices}
          selected={selectDevice?.videoInput}
          onSelect={handleSelectDevice}
        />

        <SelectDeviceBox
          type="audioInput"
          deviceList={deviceList?.audioInputDevices}
          selected={selectDevice?.audioInput}
          onSelect={handleSelectDevice}
        />
      </div>
    </>
  );
};

export default ReharsalSettingPage;
