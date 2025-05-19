import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

type UserStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userKakaoImage: string;
  setUserKaKaoImage: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  isUserRegistered: boolean;
  setIsUserRegistered: (value: boolean) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (value) => set({isLoggedIn: value}),
      userKakaoImage: '',
      setUserKaKaoImage: (value) => set({userKakaoImage: value}),
      username: '',
      setUsername: (value) => set({username: value}),
      isUserRegistered: false,
      setIsUserRegistered: (value) => set({isUserRegistered: value}),
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
