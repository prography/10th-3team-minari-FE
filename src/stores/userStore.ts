import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export type UserExperienceLevel = 'EMPTY' | 'NONE' | 'UNDER_1YEAR' | 'UNDER_3YEAR' | 'OVER_3YEAR';
export type UserDomain = 'EMPTY' | 'FRONTEND' | 'BACKEND';
type UserStore = {
  // 카카오 로그인
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userKakaoImage: string;
  setUserKaKaoImage: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  userEmail: string;
  setUserEmail: (value: string) => void;
  userDomain: UserDomain;
  setUserDomain: (value: UserDomain) => void;
  isUserRegistered: boolean;
  setIsUserRegistered: (value: boolean) => void;
  userId: string;
  setUserId: (value: string) => void;
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
      userEmail: '',
      setUserEmail: (value) => set({userEmail: value}),
      userDomain: 'EMPTY',
      setUserDomain: (value) => set({userDomain: value}),
      userId: '',
      setUserId: (value) => set({userId: value}),
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
