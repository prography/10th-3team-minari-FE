import {useEffect, useState} from 'react';
import {loadTossPayments, type TossPaymentsWidgets} from '@tosspayments/tosspayments-sdk';
import Button from '@/components/Button';
import styles from './TossPayment.module.css';
import {getRandomString} from '@/utils/getRandomString';
import {useTossPaymentPrepare} from '@/hooks/mutations/useTossPaymentPrepare';

interface TossPaymentWidgetProps {
  productId: number;
  orderName: string;
  amount: number;
  customerKey?: string;
}

const TossPaymentWidget = ({productId, orderName, amount, customerKey}: TossPaymentWidgetProps) => {
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
  const {mutateAsync: preparePayment} = useTossPaymentPrepare({
    onError: (err) => console.error(err),
  });

  useEffect(() => {
    async function initializeTossWidgets() {
      try {
        if (!TOSS_CLIENT_KEY) {
          throw new Error('TOSS_CLIENT_KEY을 환경변수에서 찾을 수 없습니다.');
        }

        if (!customerKey) {
          throw new Error('TOSS_CUSTOMER_KEY을 환경변수에서 찾을 수 없습니다.');
        }

        const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);

        const tossWidgets = tossPayments.widgets({
          customerKey,
        });

        setWidgets(tossWidgets);
      } catch (e) {
        console.error('TossPayments 초기화 실패:', e);
      }
    }

    initializeTossWidgets();
  }, [customerKey, TOSS_CLIENT_KEY]);

  useEffect(() => {
    async function renderWidgets() {
      if (!widgets) return;

      await widgets.setAmount({
        currency: 'KRW',
        value: amount,
      });

      await widgets.renderPaymentMethods({
        selector: '#payment-method',
      });

      await widgets.renderAgreement({
        selector: '#agreement',
      });
    }

    renderWidgets();
  }, [widgets, amount]);

  const handleClickPayment = async () => {
    try {
      const orderId = getRandomString();

      // 1) 결제 준비 API 호출
      await preparePayment({
        productId,
        orderId,
        amount,
      });

      // 2) 결제 위젯 호출
      await widgets?.requestPayment({
        orderId,
        orderName,
        successUrl: window.location.origin + '/payment/loading',
        failUrl: window.location.origin + '/payment/fail',
      });
    } catch (err) {
      console.error('결제 준비 실패:', err);
    }
  };

  return (
    <div className={styles.position}>
      <div className={styles['toss-modal']}>
        <div id="payment-method" />
        <div id="agreement" />

        <Button full theme="toss" onClick={handleClickPayment}>
          결제하기
        </Button>
      </div>
    </div>
  );
};

export default TossPaymentWidget;
