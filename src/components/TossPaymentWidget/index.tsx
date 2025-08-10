import {useEffect, useState} from 'react';
import {loadTossPayments, type TossPaymentsWidgets} from '@tosspayments/tosspayments-sdk';
import Button from '@/components/Button';
import styles from './TossPayment.module.css';
import {getRandomString} from '@/utils/getRandomString';

const TOSS_CLIENT_KEY = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';

interface TossPaymentWidgetProps {
  orderName: string;
  price: number;
  customerKey: string;
}

const TossPaymentWidget = ({orderName, price, customerKey}: TossPaymentWidgetProps) => {
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  useEffect(() => {
    async function initializeTossWidgets() {
      try {
        if (!TOSS_CLIENT_KEY) {
          throw new Error('TOSS_CLIENT_KEY을 환경변수에서 찾을 수 없습니다.');
        }

        // if (!TOSS_CUSTOMER_KEY) {
        //   throw new Error('TOSS_CUSTOMER_KEY을 환경변수에서 찾을 수 없습니다.');
        // }

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
  }, [customerKey]);

  useEffect(() => {
    async function renderWidgets() {
      if (!widgets) return;

      await widgets.setAmount({
        currency: 'KRW',
        value: price,
      });

      await widgets.renderPaymentMethods({
        selector: '#payment-method',
      });

      await widgets.renderAgreement({
        selector: '#agreement',
      });
    }

    renderWidgets();
  }, [widgets, price]);

  return (
    <div className={styles.position}>
      <div className={styles['toss-modal']}>
        <div id="payment-method" />
        <div id="agreement" />

        <Button
          full
          theme="toss"
          onClick={async function () {
            await widgets?.requestPayment({
              // orderId: '_GRKrwUl-Tslbgin660fW',
              // orderName: '토스 티셔츠 외 2건',
              orderId: getRandomString(),
              orderName,
              successUrl: window.location.origin + '/payment/success',
              failUrl: window.location.origin + '/payment/fail',
            });
          }}
        >
          결제하기
        </Button>
      </div>
    </div>
  );
};

export default TossPaymentWidget;
