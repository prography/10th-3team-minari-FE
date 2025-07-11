import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import {getQuestionDetail} from '@/apis/question';

export const useQuestionDetail = (questionId: number) => {
  const {data, refetch} = useQuery({
    queryKey: ['question-detail', 'questionId', questionId],
    queryFn: () => getQuestionDetail(questionId),
    enabled: !!questionId,
  });

  const questionDetail = useMemo(() => {
    if (data?.result) {
      return data?.result;
    }
    return null;
  }, [data]);

  return {
    data,
    refetch,
    questionDetail,
  };
};
