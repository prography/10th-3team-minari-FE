import {fetch} from './instance';

export const getQuestionId = async (userId: string) => {
  const response = await fetch.get<number>(`/users/${userId}/questions`);

  return response;
};

export const getContents = async (questionId: number) => {
  const response = await fetch.get<string>(`/questions/${questionId}/contents`);

  return response;
};

export const getTag = async (questionId: number) => {
  const response = await fetch.get<string[]>(`/questions/${questionId}/tag`);

  return response;
};
