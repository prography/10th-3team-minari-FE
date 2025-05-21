import {IS_DARK} from '@/constants/isDark';
import {usePathname} from 'next/navigation';

const useTheme = () => {
  const pathname = usePathname();

  const theme = IS_DARK.includes(pathname) ? 'dark' : 'light';

  return theme;
};

export default useTheme;
