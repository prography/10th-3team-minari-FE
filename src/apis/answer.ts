import {fetch} from './instance';

export const postFile = async (userId: string, questionId: number, formData: FormData) => {
  const response = await fetch.post<string>(`/${userId}/questions/${questionId}`, formData);
  return response;
};

export interface AnswerType {
  answer: string;
  question: string;
  reply: string;
  createDate: string;
  runningTime: number;
  memo: string;
}

export const getAnswer = async (userId: string, questionId: number) => {
  const response = await fetch.get<AnswerType>(`/${userId}/questions/${questionId}`);
  return response;
};

export type AnswerEligibilityType = 'FIRST' | 'SEED_REQUIRED' | 'LIMIT_REACHED' | 'UNKNOWN';

export const getAnswerEligibility = async () => {
  const response = await fetch.get<AnswerEligibilityType>(`/answer/eligibility`);
  return response;
};
