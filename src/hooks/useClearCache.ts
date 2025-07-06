import {deleteCookie} from '@/utils/cookies';

export const useClearCache = () => {
  const clearCookies = async () => {
    localStorage.removeItem('user-storage');
    await deleteCookie('access-token');
    await deleteCookie('refresh-token');
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return {clearCookies, goHome};
};
