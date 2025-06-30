const REHEARSAL = 'rehearsal';
const RESULT = 'result';
const USERS = 'users';
const MY = 'my';
const SEEDS = 'seeds';

export const PATH = {
  ROOT: '/',
  REHEARSAL: `/${REHEARSAL}`,
  RESULT: `/${RESULT}`,
  UESRS_SEEDS: `/${USERS}/${SEEDS}`,
  MY_PAGE: `/${USERS}/${MY}`,
};

export const OUT_LINK: {[key: string]: string} = {
  FAQ: 'https://button-shear-b28.notion.site/MINARI-21b31f010d1f8059be25e11819c8097b',
  BLOG: 'https://velog.io/@official_minari/posts',
  AGREEMENTS_1: 'https://button-shear-b28.notion.site/MINARI-20131f010d1f807b89ece82517780def',
  AGREEMENTS_2: 'https://button-shear-b28.notion.site/MINARI-20131f010d1f8069b258c93a49c44675',
} as const;
