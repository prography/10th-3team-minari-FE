import {create} from 'zustand';

interface ModalStore {
  modal: React.ReactNode | null;
  isOpen: boolean;
  open: (
    modal: React.ReactNode,
    disableBackdropClick?: boolean,
    historyStackPush?: boolean,
  ) => void;
  close: () => void;
  change: (modal: React.ReactNode) => void;
  disableBackdropClick: boolean;
  historyStackPush: boolean;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  isOpen: false,
  open: (modal, disableBackdropClick = false, historyStackPush = false) =>
    set({isOpen: true, modal, disableBackdropClick, historyStackPush}),
  close: () =>
    set({isOpen: false, modal: null, disableBackdropClick: false, historyStackPush: false}),
  change: (modal) => set((state) => (state.isOpen ? {...state, modal} : state)),
  disableBackdropClick: false,
  historyStackPush: false,
}));
