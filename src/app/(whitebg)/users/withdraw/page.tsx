'use client';
import styles from './page.module.css';
import Image from 'next/image';
import Minari from '@/assets/minari-black.svg';
import React from 'react';
import InfoBox from '@/components/InfoBox';
import {useUsers} from '@/hooks/queries/useUsers';
import Next from '@/assets/icon/chevron-right-white.svg';
import {useSeeds} from '@/hooks/queries/useSeeds';
import Checkbox from '@/components/Checkbox';
import {useCheckbox} from '@/hooks/useCheckbox';
import Button from '@/components/Button';
import ArrowRight from '@/assets/icon/arrow-black.svg';
import Modal from '@/components/Modal';
import {deleteUser} from '@/apis/user';
import Toast from '@/components/Toast';
import {useModalStore} from '@/stores/modalStore';
import {useClearCache} from '@/hooks/useClearCache';
import {useToastStore} from '@/stores/toastStore';
import {trackMixpanel} from '@/utils/mixpanel';

const WithdrawPage = () => {
  const {data} = useUsers();
  const {data: seed} = useSeeds();
  const {open, close} = useModalStore();

  const item = [
    {id: '1', value: false, label: '(필수) 위 내용에 동의합니다.', required: true},
    {
      id: '2',
      value: false,
      label: '(필수) 위 내용에 동의합니다.',
      required: true,
    },
  ];
  const {checkAll, checkAllIndeterminate, checkItems, checkHandler, checkAllHandler} =
    useCheckbox(item);
  const toastStore = useToastStore();
  const {clearCookies, goHome} = useClearCache();
  const allClear = async () => {
    await clearCookies();
    goHome();
  };

  // 탈퇴 클릭 >> 확인 모달
  const onClickWithdraw = async () => {
    open({
      modal: (
        <Modal
          title="정말 계정을 탈퇴 하시겠어요?"
          leftButton={
            <Button onClick={close} theme="secondary">
              취소
            </Button>
          }
          rightButton={<Button onClick={fetchDeleteUser}>계속</Button>}
        >
          <p>가지고 있는 모든 혜택이 사라져요.</p>
          <p>진행 이후 7일 이내에 복구가 가능해요.</p>
        </Modal>
      ),
    });
  };

  // 탈퇴
  const fetchDeleteUser = async () => {
    await deleteUser()
      .then((response) => {
        if (response?.code === '200') {
          trackMixpanel({name: '회원탈퇴'});
          open({
            modal: (
              <Modal
                title="탈퇴가 정상적으로 완료되었습니다"
                rightButton={<Button onClick={allClear}>처음으로</Button>}
              >
                <p>그동안 미나리를 이용해주셔서 감사합니다.</p>
              </Modal>
            ),
          });
        }
      })
      .catch(() => {
        toastStore.setTime(2000);
        toastStore.open(
          <Toast title={'탈퇴 실패'} description="앗 이런! 다시 한 번 시도해주세요." />,
        );
      });
  };

  return (
    <div className={styles.container}>
      <div className="fx">
        <span className="fx-align-center">
          <Image src={Minari} alt="" className="mg-right-4" width={28} />
        </span>
        <span className="title-md txt-primary">탈퇴하기</span>
      </div>
      <div className="mg-top-40">
        <div className="title-sm txt-black mg-bottom-16">씨앗</div>
        <InfoBox>
          <div className={styles['seeds-info']}>
            <div className="fx">
              <span className="title-sm txt-white">씨앗 이용 정보</span>
              <span className="fx-align-center mg-left-4">
                <Image src={Next} alt="" />
              </span>
            </div>
            <div className="">
              <span className="body-lg txt-white">{data?.name}님의 씨앗</span>
              <span className="body-lg txt-white mg-left-16">
                <span className="label-lg txt-white">{seed}</span>개
              </span>
            </div>
          </div>
        </InfoBox>
        <div className={styles['contents-details']}>
          <div className="body-md txt-black">
            <span className="mg-right-12">•</span>
            탈퇴시, 가지고 계신 씨앗은 모두 사라져요.
          </div>
          <div className="body-md txt-black">
            <span className="mg-right-12">•</span>
            씨앗 환불은 탈퇴 전까지만 가능해요.
          </div>
          <div className="body-md txt-black">
            <span className="mg-right-12">•</span>
            계정 복구는 탈퇴 후 7일 이내까지 가능해요.
          </div>
          <div className="body-md txt-black">
            <span className="mg-right-12">•</span>
            자세한 내용은 약관을 확인해주세요.
          </div>
        </div>
        <Checkbox checked={checkItems[0].value} id={checkItems[0].id} onChangeCheck={checkHandler}>
          (필수) 위 내용에 동의 합니다.
        </Checkbox>
      </div>
      <div className="mg-top-40 mg-bottom-40">
        <div className="title-sm txt-black mg-bottom-16">개인정보 처리 동의</div>
        <div className={styles['contents-details']}>
          <div className="body-md txt-black">
            <span className="mg-right-12">•</span>
            탈퇴를 진행하여도 계정 복구기간인 7일 내까지는 회원의 정보를 보호할 의무가 있어요.
          </div>
          <div className="body-md txt-black">
            <span className="mg-right-12">•</span>
            다만, 재화·서비스 공급완료 및 요금결제·정산 완료와 관련된 정보는 그 조항에 따라 보관할
            수 있어요.
          </div>
          <div className="body-md txt-black">
            <span className="mg-right-12">•</span>위 기간이 만료된 이후에는 지체 없이 소중한
            개인정보를 파기하니 안심하세요.
          </div>
          <div className="body-md txt-black">
            <span className="mg-right-12">•</span>
            자세한 내용은 약관을 확인해주세요.
          </div>
        </div>
        <Checkbox checked={checkItems[1].value} id={checkItems[1].id} onChangeCheck={checkHandler}>
          (필수) 위 내용에 동의 합니다.
        </Checkbox>
      </div>
      <Checkbox
        checked={checkAll}
        onChangeCheck={checkAllHandler}
        indeterminate={checkAllIndeterminate}
      >
        (전체) 위 내용에 모두 동의 합니다.
      </Checkbox>
      <div className={styles['button__wrap']}>
        <Button
          iconRight={ArrowRight}
          disabled={!checkItems.every((item) => item.value)}
          onClick={onClickWithdraw}
        >
          계속하기
        </Button>
      </div>
    </div>
  );
};

export default WithdrawPage;
