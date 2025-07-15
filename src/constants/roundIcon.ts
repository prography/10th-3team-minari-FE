import Round1 from '@/assets/icon/round-1.svg';
import Round2 from '@/assets/icon/round-2.svg';
import Round3 from '@/assets/icon/round-3.svg';
import Round4 from '@/assets/icon/round-4.svg';
import type {StaticImageData} from 'next/image';

export const ROUND_ICON: Record<number, StaticImageData> = {
  1: Round1,
  2: Round2,
  3: Round3,
  4: Round4,
};
