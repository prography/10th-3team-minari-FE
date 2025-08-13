'use client';

import {useSearchParams, useRouter} from 'next/navigation';
import {Suspense, useEffect} from 'react';
import {useTossPaymentConfirm} from '@/hooks/mutations/useTossPaymentConfirm';

const PaymentloadingInner = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {mutateAsync: prepareConfirm} = useTossPaymentConfirm({
    onError: (err) => console.error(err),
  });

  useEffect(() => {
    const paramsObj: Record<string, string> = {};

    for (const [key, value] of searchParams.entries()) {
      paramsObj[key] = value;
    }

    if (Object.keys(paramsObj).length === 0) {
      router.replace('/payment/fail');
      return;
    }

    const orderId = paramsObj['orderId'];
    const paymentKey = paramsObj['paymentKey'];
    const amount = paramsObj['amount'];
    const productId = paramsObj['productId'];

    if (!orderId || !paymentKey || !amount || !productId) {
      router.replace('/payment/fail');
      return;
    }

    const amountNum = Number(amount);
    const productIdNum = Number(productId);
    if (isNaN(amountNum) || isNaN(productIdNum) || amountNum <= 0) {
      router.replace('/payment/fail');
      return;
    }

    (async () => {
      try {
        await prepareConfirm({
          orderId,
          paymentKey,
          amount: amountNum,
          productId: amountNum,
        });
        router.replace(`/payment/success?paymentKey=${paymentKey}`);
      } catch {
        router.replace('/payment/fail');
      }
    })();
  }, [router, prepareConfirm, searchParams]);

  return <h1>결제 진행중입니다.</h1>;
};

export default function PaymentloadingPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <PaymentloadingInner />
    </Suspense>
  );
}
