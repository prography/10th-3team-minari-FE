'use client';

import {useSearchParams, useRouter} from 'next/navigation';
import React, {Suspense, useEffect} from 'react';
import {useTossPaymentConfirm} from '@/hooks/mutations/useTossPaymentConfirm';

const PaymentloadingInner = () => {
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
          orderId,
          paymentKey,
          amount: Number(amount),
        });
        router.replace('/payment/success');
      } catch {
        router.replace('/payment/fail');
      }
    })();
  }, [orderId, paymentKey, amount, router, prepareConfirm]);

  return <h1>결제 진행중입니다.</h1>;
};

export default function PaymentloadingPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <PaymentloadingInner />
    </Suspense>
  );
}
