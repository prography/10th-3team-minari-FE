export const getDevices = async () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    console.warn('브라우저가 아닌 환경에서는 enumerateDevices를 실행하지 않습니다.');
    return {
      videoInputDevices: [],
      audioInputDevices: [],
    };
  }

  if (!navigator.mediaDevices || typeof navigator.mediaDevices.enumerateDevices !== 'function') {
    console.warn('이 브라우저는 enumerateDevices를 지원하지 않습니다.');
    return {
      videoInputDevices: [],
      audioInputDevices: [],
    };
  }
  const devices = await navigator.mediaDevices.enumerateDevices();

  const videoInputDevices = devices.filter((device) => device.kind === 'videoinput');
  const audioInputDevices = devices.filter((device) => device.kind === 'audioinput');

  return {videoInputDevices, audioInputDevices};
};
