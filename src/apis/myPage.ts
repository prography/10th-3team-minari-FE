import {fetch} from '@/apis/instance';

export interface MinariRecordAnswerType {
  isExisted: boolean;
  answerId: number;
  answerDate: string;
  questionId: number;
}

interface MinariRecordResponseType {
  achievementRate: number;
  answerlist: Array<MinariRecordAnswerType>;
}

export const getMinariRecord = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const response = await fetch.get<MinariRecordResponseType>(
    `/answers?startDate=${startDate}&endDate=${endDate}`,
  );
  return response;
};
