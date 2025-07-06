'use client';
import PageLayout from '@/app/admin/_components/PageLayout';
import TextInput from '@/components/TextInput';
import React, {useState} from 'react';
import InputForm from '@/app/admin/payments/_components/InputForm';
import SelectOption, {OptionType} from '@/components/SelectOption';
import {REASON_OPTIONS, ROLE_OPTIONS} from '@/constants/adminOptions';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import {useModalStore} from '@/stores/modalStore';
import CheckModal from '@/app/admin/payments/_components/CheckModal';
import {postPayment} from '@/apis/payment';
import Toast from '@/components/Toast';
import {useToastStore} from '@/stores/toastStore';

export interface RewardFormType {
  userUUID: string;
  seed: number;
  role: string;
  reason: string;
  memo?: string;
}

const PaymentsPage = () => {
  const {open, close} = useModalStore();
  const [rewardForm, setRewardForm] = useState<RewardFormType>({
    userUUID: '',
    seed: 0,
    role: '',
    reason: '',
    memo: '',
  });
  const updateRewardForm = (e: string | number, key: string) => {
    setRewardForm({...rewardForm, [key]: e});
  };

  // 옵션 선택 상태값 관리
  const [selectedRole, setSelectedRole] = useState<OptionType>({id: '', option: ''});
  const [selectedReason, setSelectedReason] = useState<OptionType>({id: '', option: ''});
  const onClickRoleOption = (id: string | number) => {
    setSelectedRole(ROLE_OPTIONS[Number(id)]);
    updateRewardForm(ROLE_OPTIONS[Number(id)].option, 'role');
  };
  const onClickReasonOption = (id: string | number) => {
    setSelectedReason(REASON_OPTIONS[Number(id)]);
    updateRewardForm(REASON_OPTIONS[Number(id)].option, 'reason');
  };

  const onClickPayment = () => {
    open(
      <CheckModal
        form={rewardForm}
        onClickRightButton={onClickFetchPostPayment}
        onClickLeftButton={close}
      />,
    );
  };
  const toastStore = useToastStore();
  const onClickFetchPostPayment = () => {
    postPayment(rewardForm)
      .then((response) => {
        if (response?.code === '200') {
          toastStore.setTime(2000);
          toastStore.open(<Toast title={'지급 완료'} />);
        }
      })
      .catch(() => {
        toastStore.setTime(2000);
        toastStore.open(<Toast title={'지급 실패.'} type="warning" />);
      });
    close();
  };

  const valueChecker = () => {
    const formValues = rewardForm;
    if (formValues.memo === '') delete formValues.memo;
    return Object.values(formValues).some((value) => value === '');
  };

  return (
    <PageLayout title="리워드 지급">
      <InputForm title="uuid.">
        <TextInput
          value={rewardForm.userUUID}
          onChange={(e) => updateRewardForm(e.target.value, 'userUUID')}
        />
      </InputForm>
      <InputForm title="씨앗">
        <TextInput
          type="number"
          unit="개"
          value={String(rewardForm.seed)}
          onChange={(e) => updateRewardForm(e.target.value, 'seed')}
        />
      </InputForm>
      <InputForm title="담당자">
        <SelectOption
          inputField={<SelectOption.InputFieldAdmin value={selectedRole.option} />}
          height="48px"
          options={
            <SelectOption.OptionsAdmin
              selectOption={selectedRole}
              handleClick={onClickRoleOption}
              options={ROLE_OPTIONS}
            />
          }
        />
      </InputForm>
      <InputForm title="지급 사유">
        <SelectOption
          inputField={<SelectOption.InputFieldAdmin value={selectedReason.option} />}
          height="48px"
          options={
            <SelectOption.OptionsAdmin
              selectOption={selectedReason}
              handleClick={onClickReasonOption}
              options={REASON_OPTIONS}
            />
          }
        />
      </InputForm>
      <InputForm title="상세 메모">
        <Textarea
          value={rewardForm.memo}
          onChange={(e) => updateRewardForm(e.target.value, 'memo')}
        />
      </InputForm>

      <div className="mg-top-24 mg-left-100">
        <Button theme="black" onClick={onClickPayment} disabled={valueChecker()}>
          지급
        </Button>
      </div>
    </PageLayout>
  );
};

export default PaymentsPage;
