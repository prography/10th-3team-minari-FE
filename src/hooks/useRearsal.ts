// import {useMediaStore} from '@/stores/mediaStore';
// import {startAudioRecording, startVideoRecording, stopRecording} from '@/utils/record';
// import {useRef, useState} from 'react';

import {useRouter} from 'next/navigation';

/**수정이 필요한 부분 */
const useRearsal = () => {
  // const videoRecorderRef = useRef<MediaRecorder | null>(null);
  // const audioRecorderRef = useRef<MediaRecorder | null>(null);
  // const videoBlobsRef = useRef<Blob[]>([]);
  // const audioBlobsRef = useRef<Blob[]>([]);
  // const {mediaStream} = useMediaStore();
  // const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();

  const handleStartClick = () => {
    // if (mediaStream) {
    //   startVideoRecording({
    //     mediaStream,
    //     selectedMimeType: 'video/webm;codecs=vp8',
    //     videoRecorderRef,
    //     setVideoBlobsRef: videoBlobsRef,
    //   });
    //   startAudioRecording({
    //     mediaStream,
    //     selectedMimeType: 'audio/webm',
    //     audioRecorderRef,
    //     setAudioBlobsRef: audioBlobsRef,
    //   });
    //   setIsRecording(true);
    // }
  };

  const handleCloseClick = async () => {
    // await stopRecording({videoRecorderRef, audioRecorderRef});
    // if (videoBlobsRef.current.length > 0) {
    //   const blob = new Blob(videoBlobsRef.current, {type: 'video/webm'});
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.style.display = 'none';
    //   a.href = url;
    //   a.download = 'recording_video_audio.webm';
    //   document.body.appendChild(a);
    //   a.click();
    //   URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    // }
    // if (audioBlobsRef.current.length > 0) {
    //   const blob = new Blob(audioBlobsRef.current, {type: 'audio/webm'});
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.style.display = 'none';
    //   a.href = url;
    //   a.download = 'recording_audio_only.webm';
    //   document.body.appendChild(a);
    //   a.click();
    //   URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    // }
    // videoBlobsRef.current = [];
    // audioBlobsRef.current = [];
    // setIsRecording(false);
    router.push('/rehearsal/result');
  };
  return {
    handleStartClick,
    handleCloseClick,
    // isRecording,
  };
};

export default useRearsal;
