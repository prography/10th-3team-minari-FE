'use client';

import {useTossPayments} from '@/hooks/queries/useTossPayments';
import {useRouter, useSearchParams} from 'next/navigation';
import {Suspense, useEffect} from 'react';

const PaymentSuccessInner = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentKey = searchParams.get('paymentKey') ?? '';

  const {isLoading, error} = useTossPayments(paymentKey);

  useEffect(() => {
    if (!paymentKey) {
      router.replace('/payment/fail');
    }
  }, [router, paymentKey]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>결제 정보 불러오기 실패</div>;

  return (
    <div>
      <h1>결제에 성공했어요.</h1>
    </div>
  );
};

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <PaymentSuccessInner />
    </Suspense>
  );
}
