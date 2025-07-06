import {fetchAdmin} from './instance';
import {RewardFormType} from '@/app/admin/payments/page';

export const postPayment = async (rewardForm: RewardFormType) => {
  return await fetchAdmin.post<string>('/payment/force', rewardForm);
};
