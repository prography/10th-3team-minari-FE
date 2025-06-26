import Exp0Inactive from '@/assets/icon/0-inactive.png';
import Exp0Active from '@/assets/icon/0-active.png';
import Exp1Inactive from '@/assets/icon/1-inactive.png';
import Exp1Active from '@/assets/icon/1-active.png';
import Exp2Inactive from '@/assets/icon/2-inactive.png';
import Exp2Active from '@/assets/icon/2-active.png';
import Exp3Inactive from '@/assets/icon/3-inactive.png';
import Exp3Active from '@/assets/icon/3-active.png';

export const USER_EXPERIENCES = [
  {
    label: '경험 없음',
    value: 'NONE',
    imageInactive: Exp0Inactive,
    imageActive: Exp0Active,
  },
  {
    label: '0-1년차',
    value: 'UNDER_1YEAR',
    imageInactive: Exp1Inactive,
    imageActive: Exp1Active,
  },
  {
    label: '2-3년차',
    value: 'UNDER_3YEAR',
    imageInactive: Exp2Inactive,
    imageActive: Exp2Active,
  },
  {
    label: '3년차 이상',
    value: 'OVER_3YEAR',
    imageInactive: Exp3Inactive,
    imageActive: Exp3Active,
  },
] as const;

export const USER_DOMAINS = [
  {label: '프론트엔드', value: 'FRONTEND'},
  {label: '백엔드', value: 'BACKEND'},
] as const;
