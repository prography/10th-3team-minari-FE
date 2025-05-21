interface StartRecordingProps {
  mediaStream: MediaStream;
  selectedMimeType: string;
}

type StartVideoRecordingProps = StartRecordingProps & {
  videoRecorderRef: React.MutableRefObject<MediaRecorder | null>;
  setVideoBlobsRef: React.RefObject<Blob[]>;
};

type StartAudioRecordingProps = StartRecordingProps & {
  audioRecorderRef: React.MutableRefObject<MediaRecorder | null>;
  setAudioBlobsRef: React.RefObject<Blob[]>;
};

type StopRecordingProps = {
  videoRecorderRef: React.MutableRefObject<MediaRecorder | null>;
  audioRecorderRef: React.MutableRefObject<MediaRecorder | null>;
};
export const startVideoRecording = ({
  mediaStream,
  selectedMimeType = 'video/webm;codecs=vp8',
  videoRecorderRef,
  setVideoBlobsRef,
}: StartVideoRecordingProps) => {
  if (!mediaStream) return;

  try {
    setVideoBlobsRef.current = [];

    videoRecorderRef.current = new MediaRecorder(mediaStream, {
      mimeType: selectedMimeType,
      videoBitsPerSecond: 300000,
    });

    videoRecorderRef.current.ondataavailable = (event: BlobEvent) => {
      if (event.data && event.data.size > 0) {
        setVideoBlobsRef.current.push(event.data);
      }
    };

    videoRecorderRef.current?.start();
  } catch (error) {
    console.error('MediaRecorder 생성 중 오류 발생:', error);

    if (error instanceof DOMException) {
      switch (error.name) {
        case 'NotSupportedError':
          alert('이 브라우저는 해당 형식의 MediaRecorder를 지원하지 않습니다.');
          break;
        case 'InvalidStateError':
          alert('제공된 MediaStream이 유효하지 않거나 트랙이 꺼져 있습니다.');
          break;
        case 'SecurityError':
          alert(
            '보안 정책에 의해 MediaRecorder 사용이 차단되었습니다.\nHTTPS 환경인지 확인하세요.',
          );
          break;
        default:
          alert(`MediaRecorder 사용 중 알 수 없는 오류: ${error.name}`);
          break;
      }
    } else {
      alert('MediaRecorder 생성 중 예상치 못한 오류가 발생했습니다.');
    }
  }
};

export const startAudioRecording = ({
  mediaStream,
  selectedMimeType = 'audio/webm',
  audioRecorderRef,
  setAudioBlobsRef,
}: StartAudioRecordingProps) => {
  if (!mediaStream) return;

  try {
    setAudioBlobsRef.current = [];

    const audioOnlyStream = new MediaStream(mediaStream.getAudioTracks());

    audioRecorderRef.current = new MediaRecorder(audioOnlyStream, {
      mimeType: selectedMimeType,
    });

    audioRecorderRef.current.ondataavailable = (event: BlobEvent) => {
      if (event.data && event.data.size > 0) {
        setAudioBlobsRef.current.push(event.data);
      }
    };

    audioRecorderRef.current?.start();
  } catch (error) {
    console.error('Error starting recording:', error);
  }
};

export const stopRecording = async ({videoRecorderRef, audioRecorderRef}: StopRecordingProps) => {
  if (!videoRecorderRef.current || !audioRecorderRef.current) return;

  await Promise.all([
    new Promise<void>((resolve) => {
      videoRecorderRef.current!.onstop = () => resolve();
      videoRecorderRef.current!.stop();
    }),
    new Promise<void>((resolve) => {
      audioRecorderRef.current!.onstop = () => resolve();
      audioRecorderRef.current!.stop();
    }),
  ]);
};
