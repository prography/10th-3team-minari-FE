import 'tsconfig-paths/register';

import type { Config } from 'tailwindcss';
import { objectKeysAsArray } from '@/types/keysof';

const gray = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#E5E5E5',
  300: '#D4D4D4',
  400: '#A3A3A3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
} as const;

const blue = {
  50: '#E6F1FD',
  100: '#B0D5F9',
  200: '#8AC0F6',
  300: '#54A3F2',
  400: '#3391F0',
  500: '#0076EC',
  600: '#006BD7',
  700: '#0054A8',
  800: '#004182',
  900: '#003263',
} as const;

const sky = {
  50: '#DFF4FE',
  100: '#AFE3FC',
  200: '#78D1FB',
  300: '#38BEF8',
  400: '#00B1F8',
  500: '#00A3F5',
  600: '#0095E6',
  700: '#0082D2',
  800: '#0071BD',
  900: '#00519B',
} as const;

const green = {
  50: '#E7F8F2',
  100: '#B5E9D8',
  200: '#91DFC5',
  300: '#5FD0AB',
  400: '#40C79A',
  500: '#10B981',
  600: '#0FA875',
  700: '#0B835C',
  800: '#096647',
  900: '#074E36',
} as const;

const yellow = {
  50: '#FEF5E7',
  100: '#FCE1B3',
  200: '#FAD28F',
  300: '#F8BE5C',
  400: '#F7B13C',
  500: '#F59E0B',
  600: '#DF900A',
  700: '#AE7008',
  800: '#875706',
  900: '#674205',
} as const;

const red = {
  50: '#FDECEC',
  100: '#FAC5C5',
  200: '#F8A9A9',
  300: '#F48282',
  400: '#F26969',
  500: '#EF4444',
  600: '#D93E3E',
  700: '#AA3030',
  800: '#832525',
  900: '#641D1D',
} as const;

const primary = objectKeysAsArray(blue).reduce((prev, curr) => {
  prev[curr] = blue[curr];
  return prev;
}, {} as Record<keyof typeof blue, (typeof blue)[keyof typeof blue]>);

const secondary = objectKeysAsArray(gray).reduce((prev, curr) => {
  prev[curr] = gray[curr];
  return prev;
}, {} as Record<keyof typeof gray, (typeof gray)[keyof typeof gray]>);

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#FFFFFF',
        gray,
        blue,
        sky,
        green,
        yellow,
        red,
        primary,
        secondary,
      },
      fontFamily: {},
    },
  },
  plugins: [],
};

export default config;
