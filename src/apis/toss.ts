import {fetch} from './instance';

export const postTossPaymentPrepare = async (data: TossPaymentPreparePostType) => {
  try {
    const response = await fetch.post<string>(`/toss/payments/prepare`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const postTossPaymentConfirm = async (data: TossPaymentConfirmPostType) => {
  try {
    const response = await fetch.post<string>(`/toss/payments/confirm`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

interface TossPayment {
  orderId: string;
  amount: number;
}

export interface TossPaymentPreparePostType extends TossPayment {
  productId: number;
}

export interface TossPaymentConfirmPostType extends TossPayment {
  paymentKey: string;
}
