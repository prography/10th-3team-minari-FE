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
  개인정보_취급방침: 'https://button-shear-b28.notion.site/MINARI-20131f010d1f807b89ece82517780def',
  이용약관: 'https://button-shear-b28.notion.site/MINARI-20131f010d1f8069b258c93a49c44675',
  환불_정책: 'https://button-shear-b28.notion.site/21b31f010d1f8077b4f6e57235b52079',
  공지사항: 'https://button-shear-b28.notion.site/22331f010d1f80538f24cb456a7f6eff',
} as const;
