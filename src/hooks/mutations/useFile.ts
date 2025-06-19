import {postFile} from '@/apis/answer';
import type {ApiResponse} from '@/apis/instance/APIClient';
import {useMutation} from '@tanstack/react-query';

export const useFile = (options?: {onSuccess?: () => void; onError?: (err: Error) => void}) => {
  return useMutation<
    ApiResponse<string> | null,
    Error,
    {userId: string; questionId: number; formData: FormData}
  >({
    mutationKey: ['file'],
    mutationFn: async ({userId, questionId, formData}) => {
      return postFile(userId, questionId, formData);
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
