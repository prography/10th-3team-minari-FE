import {create} from 'zustand';

interface OpenType {
  modal: React.ReactNode;
  disableBackdropClick?: boolean;
  historyStackPush?: boolean;
  onBackdropClick?: () => void;
}

interface ModalStore {
  modal: React.ReactNode | null;
  isOpen: boolean;
  open: ({modal, disableBackdropClick, historyStackPush, onBackdropClick}: OpenType) => void;
  close: () => void;
  change: (modal: React.ReactNode) => void;
  disableBackdropClick: boolean;
  historyStackPush: boolean;
  onBackdropClick?: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: null,
  isOpen: false,
  open: ({modal, disableBackdropClick = false, historyStackPush = false, onBackdropClick}) =>
    set({isOpen: true, modal, disableBackdropClick, historyStackPush, onBackdropClick}),
  close: () => {
    set({
      isOpen: false,
      modal: null,
      disableBackdropClick: false,
      historyStackPush: false,
      onBackdropClick: undefined,
    });
  },
  change: (modal) => set((state) => (state.isOpen ? {...state, modal} : state)),
  disableBackdropClick: false,
  historyStackPush: false,
  onBackdropClick: undefined,
}));
