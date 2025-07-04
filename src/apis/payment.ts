import {fetch} from './instance';
import {RewardFormType} from '@/app/admin/payments/page';

export const postPayment = async (rewardForm: RewardFormType) => {
  return await fetch.post<string>('/payment/force', rewardForm);
};
