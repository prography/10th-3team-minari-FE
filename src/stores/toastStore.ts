import {create} from 'zustand';

interface ToastStore {
  toast: React.ReactNode | null;
  isOpen: boolean;
  open: (toast: React.ReactNode) => void;
  close: () => void;
  change: (toast: React.ReactNode) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  isOpen: false,
  open: (toast) => set({isOpen: true, toast}),
  close: () => set({isOpen: false, toast: null}),
  change: (toast) => set((state) => (state.isOpen ? {...state, toast} : state)),
}));
