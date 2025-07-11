import {fetch} from '@/apis/instance';

export const getSeeds = async () => {
  const response = await fetch.get<number>('/credits/users/left');
  return response;
};
