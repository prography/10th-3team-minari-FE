'use client';

import {useDeviceStore, type SelectDevice} from '@/stores/devicsStore';
import {useMediaStore} from '@/stores/mediaStore';
import {getDevices} from '@/utils/device';
import {closeMediaStream, getMediaStream} from '@/utils/media';
import {useCallback, useEffect} from 'react';
import {useErrorModal} from '@/components/Modal/hooks/useErrorModal';
import {OUT_LINK} from '@/constants/path';

const useMedia = () => {
  const {mediaStream, setMediaStream, mediaStreamStatus, setMediaStreamStatus} = useMediaStore();
  const {setSelectDevice, setDevices} = useDeviceStore();
  const {showErrorModalBasic, showErrorModalLeavePage} = useErrorModal();

  const startMedia = useCallback(
    async (
      {
        videoInput,
        audioInput,
      }: {
        videoInput?: MediaDeviceInfo;
        audioInput?: MediaDeviceInfo;
      },
      initializeDevices = false,
    ) => {
      try {
        setMediaStreamStatus('pending');

        const newMedia = await getMediaStream({
          videoInput,
          audioInput,
        });

        if (initializeDevices) {
          const newDevices = await getDevices();
          setDevices(newDevices);
          setSelectDevice('audioInput', newDevices.audioInputDevices[0]);
          setSelectDevice('videoInput', newDevices.videoInputDevices[0]);
        }

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
            showErrorModalLeavePage(
              '기기 접근이 제한되었어요.',
              <>
                <p>기기 설정에서 카메라와 마이크 접근을 허용해주세요.</p>
              </>,
              {
                content: '자세히보기',
                page: OUT_LINK.미나리_사용방법,
              },
            );
          } else if (error.message === 'device-not-found') {
            setMediaStreamStatus('device-not-found');
            showErrorModalBasic(
              '카메라 또는 마이크를 찾을 수 없어요.',
              <p>카메라와 마이크를 연결 가능한 환경인지 확인해주세요.</p>,
            );
          } else if (error.message === 'insecure-context') {
            showErrorModalBasic(
              '보안 연결이 필요해요.',
              <>
                <p>카메라와 마이크는 HTTPS 환경에서만 사용할 수 있어요.</p>
                <p>보안 연결을 확인해주세요.</p>
              </>,
            );
          } else {
            setMediaStreamStatus('error');
            showErrorModalLeavePage(
              '알 수 없는 오류가 발생했어요.',
              <>
                <p>새로고침(Win+R) 후 다시 시도해주세요.</p>
                <p>계속되면 고객센터에 말씀해주세요.</p>
              </>,
              {
                content: '문의하기',
                page: OUT_LINK.FQA,
              },
            );
          }
        }
      }
    },
    [setMediaStream, setMediaStreamStatus],
  );

  const stopMedia = useCallback(() => {
    closeMediaStream(mediaStream);
    setMediaStream(null);
    setMediaStreamStatus('idle');
  }, [mediaStream]);

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
