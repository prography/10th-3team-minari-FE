import {type SelectDevice} from '@/stores/devicsStore';
import {useMediaStore} from '@/stores/mediaStore';
import {closeMediaStream, getMediaStream} from '@/utils/media';
import {useCallback, useEffect} from 'react';

const useMedia = () => {
  const {mediaStream, setMediaStream, mediaStreamStatus, setMediaStreamStatus} = useMediaStore();

  const startMedia = useCallback(
    async ({
      videoInput,
      audioInput,
    }: {
      videoInput?: MediaDeviceInfo;
      audioInput?: MediaDeviceInfo;
    }) => {
      try {
        setMediaStreamStatus('pending');

        const newMedia = await getMediaStream({
          videoInput,
          audioInput,
        });

        if (newMedia) {
          setMediaStream(newMedia);
          setMediaStreamStatus('connected');
        } else {
          setMediaStreamStatus('idle');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === 'permission-denied') {
            setMediaStreamStatus('permission-denied');
          } else if (error.message === 'device-not-found') {
            setMediaStreamStatus('device-not-found');
          } else if (error.message === 'insecure-context') {
            setMediaStreamStatus('insecure-context');
          } else {
            setMediaStreamStatus('error');
          }
        }
      }
    },
    [setMediaStream, setMediaStreamStatus],
  );

  const stopMedia = () => {
    closeMediaStream(mediaStream);
    setMediaStream(null);
    setMediaStreamStatus('idle');
  };

  const changeMedia = (selectDevice: SelectDevice) => {
    const {videoInput, audioInput} = selectDevice;

    stopMedia();
    startMedia({videoInput, audioInput});
  };

  useEffect(() => {
    if (!mediaStream) return;

    const checkTrackEnded = () => {
      setMediaStreamStatus('idle');
    };

    const tracks = mediaStream.getTracks();

    tracks.forEach((track) => {
      track.addEventListener('ended', checkTrackEnded);
    });

    return () => {
      tracks.forEach((track) => {
        track.removeEventListener('ended', checkTrackEnded);
      });
    };
  }, [mediaStream, mediaStreamStatus, setMediaStreamStatus]);

  return {
    mediaStream,
    mediaStreamStatus,
    setMediaStream,
    setMediaStreamStatus,
    startMedia,
    stopMedia,
    changeMedia,
  };
};

export default useMedia;
