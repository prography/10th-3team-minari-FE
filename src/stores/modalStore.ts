import {create} from 'zustand';

interface ModalStore {
  modal: React.ReactNode | null;
  isOpen: boolean;
  open: (modal: React.ReactNode, disableBackdropClick: boolean) => void;
  close: () => void;
  change: (modal: React.ReactNode) => void;
  disableBackdropClick: boolean;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  isOpen: false,
  open: (modal, disableBackdropClick = false) => set({isOpen: true, modal, disableBackdropClick}),
  close: () => set({isOpen: false, modal: null, disableBackdropClick: false}),
  change: (modal) => set((state) => (state.isOpen ? {...state, modal} : state)),
  disableBackdropClick: false,
}));
