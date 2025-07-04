'use client';
import PageLayout from '@/app/admin/_components/PageLayout';
import TextInput from '@/components/TextInput';
import React, {useState} from 'react';
import InputForm from '@/app/admin/payments/_components/InputForm';
import SelectOption, {OptionType} from '@/components/SelectOption';
import {MANAGER_OPTIONS, REASON_OPTIONS} from '@/constants/adminOptions';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import {useModalStore} from '@/stores/modalStore';
import CheckModal from '@/app/admin/payments/_components/CheckModal';
import {postPayment} from '@/apis/payment';

export interface RewardFormType {
  uuid: string;
  seed: number;
  manager: string;
  reason: string;
  memo?: string;
}

const PaymentsPage = () => {
  const {open, close} = useModalStore();
  const [rewardForm, setRewardForm] = useState<RewardFormType>({
    uuid: '',
    seed: 0,
    manager: '',
    reason: '',
    memo: '',
  });
  const updateRewardForm = (e: string | number, key: string) => {
    setRewardForm({...rewardForm, [key]: e});
  };

  // 옵션 선택 상태값 관리
  const [selectedManager, setSelectedManager] = useState<OptionType>({id: '', option: ''});
  const [selectedReason, setSelectedReason] = useState<OptionType>({id: '', option: ''});
  const onClickManagerOption = (id: string | number) => {
    setSelectedManager(MANAGER_OPTIONS[Number(id)]);
    updateRewardForm(MANAGER_OPTIONS[Number(id)].option, 'manager');
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
  const onClickFetchPostPayment = () => {
    postPayment(rewardForm).then((response) => {
      console.log(response);
    });
  };

  const valueChecker = () => {
    const formValues = rewardForm;
    delete formValues.memo;
    return Object.values(formValues).some((value) => value === '');
  };

  return (
    <PageLayout title="리워드 지급">
      <InputForm title="uuid.">
        <TextInput
          value={rewardForm.uuid}
          onChange={(e) => updateRewardForm(e.target.value, 'uuid')}
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
          inputField={<SelectOption.InputFieldAdmin value={selectedManager.option} />}
          height="48px"
          options={
            <SelectOption.OptionsAdmin
              selectOption={selectedManager}
              handleClick={onClickManagerOption}
              options={MANAGER_OPTIONS}
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
        <Textarea value={rewardForm.memo} setValue={(e) => updateRewardForm(e, 'memo')} />
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
