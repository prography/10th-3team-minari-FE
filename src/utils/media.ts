interface GetMediaStreamProps {
  videoInput?: MediaDeviceInfo;
  audioInput?: MediaDeviceInfo;
}

export const getMediaStream = async ({videoInput, audioInput}: GetMediaStreamProps) => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: {ideal: 1280},
        height: {ideal: 720},
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
    if (error instanceof DOMException) {
      switch (error.name) {
        case 'NotAllowedError':
        case 'PermissionDeniedError':
          // alert('마이크 권한이 거부되었습니다. 사용을 위해 권한을 허용해주세요.');
          throw new Error('permission-denied');
        case 'NotFoundError':
          // alert('선택한 입력 장치를 찾을 수 없습니다.\n기기가 연결되어 있는지 확인해주세요.');
          throw new Error('device-not-found');
        case 'OverconstrainedError':
          alert();
          // '선택한 장치 조건을 만족하는 기기를 찾을 수 없습니다.\n올바른 장치를 선택했는지 확인해주세요.',
          throw new Error('device-not-found');
        case 'SecurityError':
          // alert(`알 수 없는 오류가 발생했습니다: ${error.name}`);
          throw new Error('insecure-context');
        default:
          // alert(`알 수 없는 오류가 발생했습니다: ${error.name}`);
          throw new Error('error');
      }
    } else {
      // alert('스트림 요청 중 알 수 없는 오류가 발생했습니다.');
      throw new Error('error');
    }
  }
};
