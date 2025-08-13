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

export const getTossPayments = async ({paymentKey}: TossPaymentsGetType) => {
  try {
    const response = await fetch.get<TossPaymentsResponseType>(`/toss/payments/${paymentKey}`);
    return response;
  } catch (error) {
    throw error;
  }
};

interface TossPayment {
  orderId: string;
  amount: number;
  productId: number;
}

interface TossPaymentKey {
  paymentKey: string;
}

type TossPaymentPreparePostType = TossPayment;

type TossPaymentConfirmPostType = TossPayment & TossPaymentKey;

type TossPaymentsGetType = TossPaymentKey;

interface TossPaymentsResponseType {
  version: string;
  paymentKey: string;
  type: string;
  orderId: string;
  orderName: string;
  mId: string;
  currency: string;
  method: string;
  totalAmount: number;
  balanceAmount: number;
  status: string;
  requestedAt: string;
  approvedAt: string;
  useEscrow: boolean;
  cultureExpense: boolean;
  isPartialCancelable: boolean;
  suppliedAmount: number;
  vat: number;
  taxFreeAmount: number;
  taxExemptionAmount: number;
  lastTransactionKey: string;
  country: string;
  easyPay: {
    provider: string;
    amount: number;
    discountAmount: number;
  };
  receipt: {
    url: string;
  };
  checkout: {
    url: string;
  };
}
