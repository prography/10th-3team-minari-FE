export const getDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoInputDevices = devices.filter((device) => device.kind === 'videoinput');
  const audioInputDevices = devices.filter((device) => device.kind === 'audioinput');

  return {videoInputDevices, audioInputDevices};
};
