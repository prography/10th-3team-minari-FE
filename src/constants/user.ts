import Exp0Inactive from '@/assets/icon/0-inactive.svg';
import Exp0Active from '@/assets/icon/0-active.svg';
import Exp1Inactive from '@/assets/icon/1-inactive.svg';
import Exp1Active from '@/assets/icon/1-active.svg';
import Exp2Inactive from '@/assets/icon/2-inactive.svg';
import Exp2Active from '@/assets/icon/2-active.svg';
import Exp3Inactive from '@/assets/icon/3-inactive.svg';
import Exp3Active from '@/assets/icon/3-active.svg';

export const USER_EXPERIENCES_EXISTENCE = [
  {label: '실무 경험이 없어요', value: 'STUDY'},
  {label: '실무 경험이 있어요', value: 'WORK'},
] as const;

export const USER_EXPERIENCES_WORK = [
  {
    label: '외주/기업\n프로젝트\n 경험만 있어요',
    value: 'NONE',
    imageInactive: Exp0Inactive,
    imageActive: Exp0Active,
  },
  {
    label: '경력 0년차',
    value: 'UNDER_1YEAR',
    imageInactive: Exp1Inactive,
    imageActive: Exp1Active,
  },
  {
    label: '경력 1~3년차',
    value: 'UNDER_3YEAR',
    imageInactive: Exp2Inactive,
    imageActive: Exp2Active,
  },
  {
    label: '4년차 이상',
    value: 'OVER_3YEAR',
    imageInactive: Exp3Inactive,
    imageActive: Exp3Active,
  },
] as const;

export const USER_EXPERIENCES_STUDY = [
  {
    label: '비전공자',
    value: 'NONE',
    imageInactive: Exp0Inactive,
    imageActive: Exp0Active,
  },
  {
    label: '고등학생\n~유관 전공\n 1~2학년',
    value: 'UNDER_1YEAR',
    imageInactive: Exp1Inactive,
    imageActive: Exp1Active,
  },
  {
    label: '유관 전공\n3~4학년',
    value: 'UNDER_3YEAR',
    imageInactive: Exp2Inactive,
    imageActive: Exp2Active,
  },
  {
    label: '졸업 \n~취준생',
    value: 'OVER_3YEAR',
    imageInactive: Exp3Inactive,
    imageActive: Exp3Active,
  },
] as const;

export const USER_DOMAINS = [
  {label: '프론트엔드', value: 'FRONTEND'},
  {label: '백엔드', value: 'BACKEND'},
] as const;
