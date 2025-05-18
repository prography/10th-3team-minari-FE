import {create} from 'zustand';

type MediaStore = {
  mediaStream: MediaStream | null;
  setMediaStream: (stream: MediaStream) => void;
};

export const useMediaStore = create<MediaStore>((set) => ({
  mediaStream: null,
  setMediaStream: (stream) => set({mediaStream: stream}),
}));
