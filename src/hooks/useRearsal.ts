import {useCompleteModal} from '@/contexts/CompleteModalProvider';
import {useMediaStore} from '@/stores/mediaStore';
import {startAudioRecording, startVideoRecording, stopRecording} from '@/utils/record';
import {useRef, useState} from 'react';
import {useFile} from './mutations/useFile';

type RecordingStatus = 'idle' | 'recording' | 'paused' | 'stopped';

const useRearsal = () => {
  const videoRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const videoBlobsRef = useRef<Blob[]>([]);
  const audioBlobsRef = useRef<Blob[]>([]);
  const {mediaStream} = useMediaStore();
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>('idle');
  const {handleIsUpload} = useCompleteModal();
  const fileMutation = useFile({
    onSuccess: () => {
      handleIsUpload();
    },
  });

  const handleRearsalStart = () => {
    if (mediaStream) {
      startVideoRecording({
        mediaStream,
        selectedMimeType: 'video/webm;codecs=vp8',
        videoRecorderRef,
        setVideoBlobsRef: videoBlobsRef,
      });
      startAudioRecording({
        mediaStream,
        selectedMimeType: 'audio/webm',
        audioRecorderRef,
        setAudioBlobsRef: audioBlobsRef,
      });

      setRecordingStatus('recording');
    }
  };

  const handleRearsalClose = async ({
    userId,
    questionId,
    memo,
  }: {
    userId: string;
    questionId: number;
    memo?: string;
  }) => {
    await stopRecording({videoRecorderRef, audioRecorderRef});
    setRecordingStatus('stopped');

    const formData = new FormData();

    if (audioBlobsRef.current.length > 0) {
      const audioBlob = new Blob(audioBlobsRef.current, {type: 'audio/webm'});
      formData.append('file', audioBlob, 'recording_audio_only.webm');
    }

    if (memo) formData.append('memo', memo);

    try {
      await fileMutation.mutateAsync({userId, questionId, formData});
    } catch (err) {
      console.error('업로드 실패:', err);
    }

    videoBlobsRef.current = [];
    audioBlobsRef.current = [];
  };

  const handleRearsalPause = () => {
    if (recordingStatus === 'recording') {
      videoRecorderRef.current?.pause();
      audioRecorderRef.current?.pause();
      setRecordingStatus('paused');
    } else if (recordingStatus === 'paused') {
      videoRecorderRef.current?.resume();
      audioRecorderRef.current?.resume();
      setRecordingStatus('recording');
    } else return;
  };

  const handleRearsalRestart = async () => {
    await stopRecording({videoRecorderRef, audioRecorderRef});
    setRecordingStatus('idle');
    videoBlobsRef.current = [];
    audioBlobsRef.current = [];
  };

  return {
    handleRearsalStart,
    handleRearsalClose,
    handleRearsalPause,
    handleRearsalRestart,
    recordingStatus,
  };
};

export default useRearsal;

// <- 입력스트림을 webm 포맷 파일로 다운로드 하는 코드 ->
// const handleRearsalClose = async () => {
//   if (recordingStatus !== 'recording') return;
//   await stopRecording({videoRecorderRef, audioRecorderRef});
//   setRecordingStatus('stopped');
//   // if (videoBlobsRef.current.length > 0) {
//   //   const blob = new Blob(videoBlobsRef.current, {type: 'video/webm'});
//   //   const url = URL.createObjectURL(blob);
//   //   const a = document.createElement('a');
//   //   a.style.display = 'none';
//   //   a.href = url;
//   //   a.download = 'recording_video_audio.webm';
//   //   document.body.appendChild(a);
//   //   a.click();
//   //   URL.revokeObjectURL(url);
//   //   document.body.removeChild(a);
//   // }
//   if (audioBlobsRef.current.length > 0) {
//     const blob = new Blob(audioBlobsRef.current, {type: 'audio/webm'});
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.style.display = 'none';
//     a.href = url;
//     a.download = 'recording_audio_only.webm';
//     document.body.appendChild(a);
//     a.click();
//     URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   }
//   videoBlobsRef.current = [];
//   audioBlobsRef.current = [];

//   // router.push('/rehearsal/result');
// };

// <- 비디오 출력물을 폼데이터에 넣을때 쓰는 코드 ->
// if (videoBlobsRef.current.length > 0) {
//   const videoBlob = new Blob(videoBlobsRef.current, {type: 'video/webm'});
//   formData.append('video', videoBlob, 'recording_video_audio.webm');
// }
