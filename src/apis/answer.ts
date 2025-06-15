import {fetch} from './instance';

export const postFile = async (userId: string, questionId: number, formData: FormData) => {
  const response = await fetch.post<string>(`/${userId}/questions/${questionId}`, formData);
  return response;
};

export const getAnswer = async (userId: string, questionId: number) => {
  const response = await fetch.get<string>(`/${userId}/questions/${questionId}`);
  return response;
};
