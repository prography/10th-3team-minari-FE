import {create} from 'zustand';

type MediaStreamStatus =
  | 'idle' // 아무것도 시도하지 않음
  | 'pending' // 요청 중 (getUserMedia 진행 중)
  | 'connected' // 스트림 획득 성공
  | 'error' // 치명적 오류 (마이크 없음 등)
  | 'permission-denied' // 사용자가 권한 거부
  | 'device-not-found' // 선택된 장치를 찾을 수 없음
  | 'insecure-context'; // HTTPS 아님 등 보안 오류

type MediaStore = {
  mediaStream: MediaStream | null;
  setMediaStream: (stream: MediaStream | null) => void;
  mediaStreamStatus: MediaStreamStatus;
  setMediaStreamStatus: (mediaStreamStatus: MediaStreamStatus) => void;
};

export const useMediaStore = create<MediaStore>((set) => ({
  mediaStream: null,
  setMediaStream: (stream) => set({mediaStream: stream}),
  mediaStreamStatus: 'idle',
  setMediaStreamStatus: (StreamStatus) => set({mediaStreamStatus: StreamStatus}),
}));
