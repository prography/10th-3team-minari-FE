const REHEARSAL = 'rehearsal';
const SETTING = 'setting';
const RESULT = 'result';

export const PATH = {
  ROOT: '/',
  REHEARSAL: `/${REHEARSAL}`,
  REHEARSAL_SETTING: `/${REHEARSAL}/${SETTING}`,
  REHEARSAL_RESULT: `/${REHEARSAL}/${RESULT}`,
};

export const OUT_LINK = {
  FAQ: 'https://button-shear-b28.notion.site/MINARI-21b31f010d1f8059be25e11819c8097b',
  BLOG: 'https://velog.io/@official_minari/posts',
  AGREEMENTS: 'https://button-shear-b28.notion.site/MINARI-20131f010d1f8021839ae73b9e51b1f4',
} as const;
