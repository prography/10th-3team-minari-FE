import type {ApiResponse} from '@/apis/instance/APIClient';
import {postTossPaymentConfirm, type TossPaymentConfirmPostType} from '@/apis/toss';
import {useMutation} from '@tanstack/react-query';

export const useTossPaymentConfirm = (options?: {
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}) => {
  return useMutation<ApiResponse<string> | null, Error, TossPaymentConfirmPostType>({
    mutationKey: ['toss', 'payment', 'confirm'],
    mutationFn: postTossPaymentConfirm,
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
