import {create} from 'zustand';

interface ModalStore {
  modal: React.ReactNode | null;
  isOpen: boolean;
  open: (modal: React.ReactNode) => void;
  close: () => void;
  change: (modal: React.ReactNode) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  isOpen: false,
  open: (modal) => set({isOpen: true, modal}),
  close: () => set({isOpen: false, modal: null}),
  change: (modal) => set((state) => (state.isOpen ? {...state, modal} : state)),
}));
