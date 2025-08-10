import type {ApiResponse} from '@/apis/instance/APIClient';
import {postTossPaymentPrepare, type TossPaymentPreparePostType} from '@/apis/toss';
import {useMutation} from '@tanstack/react-query';

export const useTossPaymentPrepare = (options?: {
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}) => {
  return useMutation<ApiResponse<string> | null, Error, TossPaymentPreparePostType>({
    mutationKey: ['toss', 'payment', 'prepare'],
    mutationFn: postTossPaymentPrepare,
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
