'use client';

import {useTossPaymentConfirm} from '@/hooks/mutations/useTossPaymentConfirm';
import {useSearchParams, useRouter} from 'next/navigation';
import React, {useEffect} from 'react';

const PaymentloadingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {mutateAsync: prepareConfirm} = useTossPaymentConfirm({
    onError: (err) => console.error(err),
  });

  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');

  useEffect(() => {
    if (!orderId || !paymentKey || !amount) {
      router.replace('/payment/fail');
      return;
    }
    (async () => {
      try {
        await prepareConfirm({
          orderId: orderId,
          paymentKey: paymentKey,
          amount: Number(amount),
        });
        router.replace('/payment/success');
      } catch (e) {
        console.error(e);
        router.replace('/payment/fail');
        return;
      }
    })();
  }, [paymentKey, orderId, amount, router, prepareConfirm]);

  return (
    <div>
      <h1>결제 진행중입니다.</h1>
    </div>
  );
};

export default PaymentloadingPage;
