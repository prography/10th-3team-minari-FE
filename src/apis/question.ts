import {fetch} from './instance';

export const getQuestionId = async (userId: string) => {
  const response = await fetch.get<number>(`/users/${userId}/questions`);

  return response;
};

export const getContents = async (questionId: number) => {
  const response = await fetch.get<string>(`/questions/${questionId}/contents`, {
    cache: 'no-store',
  });

  return response;
};

export const getTag = async (questionId: number) => {
  const response = await fetch.get<string[]>(`/questions/${questionId}/tag`, {
    cache: 'no-store',
  });

  return response;
};
