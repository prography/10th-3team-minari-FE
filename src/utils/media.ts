interface GetMediaStreamProps {
  videoInput: MediaDeviceInfo | undefined;
  audioInput: MediaDeviceInfo | undefined;
}

export const getMediaStream = async ({videoInput, audioInput}: GetMediaStreamProps) => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: {ideal: 1920},
        height: {ideal: 1080},
        frameRate: 30,
        deviceId: videoInput?.deviceId ? {exact: videoInput.deviceId} : undefined,
      },
      audio: {
        echoCancellation: true,
        deviceId: audioInput?.deviceId ? {exact: audioInput.deviceId} : undefined,
      },
    });

    return mediaStream;
  } catch (error) {
    console.error('미디어 디바이스 접속 에러', error);
  }
};
