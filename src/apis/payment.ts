import {fetch, fetchAdmin} from './instance';
import {RewardFormType} from '@/app/admin/payments/page';

export const postPayment = async (rewardForm: RewardFormType) => {
  return await fetchAdmin.post<string>('/payment/force/v2', rewardForm);
};

export interface ProductType {
  quantity: number;
  realPrice: number;
  fakePrice: number;
  message: string;
}
export const getProducts = async () => {
  return await fetch.get<Array<ProductType>>('/products/sell');
};
