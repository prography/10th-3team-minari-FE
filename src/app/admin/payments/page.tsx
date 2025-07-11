'use client';
import TextInput from '@/components/TextInput';
import React, {useEffect, useState} from 'react';
import SelectOption, {OptionType} from '@/components/SelectOption';
import {REASON_OPTIONS, ROLE_OPTIONS} from '@/constants/adminOptions';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import {useModalStore} from '@/stores/modalStore';
import CheckModal from '@/app/admin/payments/_components/CheckModal';
import {postPayment} from '@/apis/payment';
import Toast from '@/components/Toast';
import {useToastStore} from '@/stores/toastStore';
import PageLayout from '@/app/admin/_components';
import InputForm from '@/app/admin/payments/_components/InputForm';
import {useProductsSell} from '@/hooks/queries/useProductsSell';

export interface RewardFormType {
  userUUID: string;
  seeds: number;
  role: string;
  reason: string;
  productId: number;
  memo?: string;
}

const PaymentsPage = () => {
  const {open, close} = useModalStore();
  const [rewardForm, setRewardForm] = useState<RewardFormType>({
    userUUID: '',
    seeds: 0,
    role: '',
    reason: '',
    productId: 0,
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

  // 씨앗 옵션 생성 + 선택 상태값 관리
  const [seedOptions, setSeedOptions] = useState<OptionType[]>([]);
  const [selectedSeed, setSelectedSeed] = useState<OptionType>({id: '', option: ''});
  const onClickSeedOption = (id: string | number) => {
    const idx = seedOptions.findIndex((item) => item.id === id);
    setSelectedSeed(seedOptions[idx]);
    updateRewardForm(id, 'seeds');
  };
  const {data} = useProductsSell();
  useEffect(() => {
    const arr: OptionType[] = [];
    data?.forEach((item) => {
      arr.push({id: item.quantity, option: `씨앗 ${item.quantity}개 (${item.realPrice}원)`});
    });
    setSeedOptions(arr);
  }, [data]);

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
      <InputForm title="가격">
        <SelectOption
          inputField={<SelectOption.InputFieldAdmin value={selectedSeed.option} />}
          height="48px"
          options={
            <SelectOption.OptionsAdmin
              selectOption={selectedSeed}
              handleClick={onClickSeedOption}
              options={seedOptions}
            />
          }
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
