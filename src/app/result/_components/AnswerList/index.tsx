'use client';

import {Fragment, useState} from 'react';
import ListRow from '../ListRow';
import Spacing from '@/components/Spacing';
import type {AnswerType} from '@/apis/answer';
import type {ApiResponse} from '@/apis/instance/APIClient';
import {useModalStore} from '@/stores/modalStore';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import {useRouter} from 'next/navigation';
import {PATH} from '@/constants/path';

const AnswerList = ({answer}: {answer?: ApiResponse<AnswerType> | null}) => {
  const router = useRouter();
  const {open: opneModal, close: closeModal} = useModalStore();
  const [seeds, setSeeds] = useState(false);

  const handleReTry = () => {
    router.push(PATH.REHEARSAL);
    closeModal();
  };

  const handleBuySeeds = () => {
    router.push(PATH.UESRS_SEEDS);
    closeModal();
  };

  const handleClickOpenModal = () => {
    opneModal(
      <Modal
        title={seeds ? '지금 답변이 아쉬우신가요?' : '앗 씨앗이 부족해요.'}
        rightButton={
          <Button onClick={seeds ? handleReTry : handleBuySeeds}>
            {seeds ? '다시 도전하기' : '씨앗 사러 가기'}
          </Button>
        }
      >
        <p>더 멋진 답변을 준비할 수 있어요.</p>
        <p>{seeds ? '씨앗 1개가 사용돼요.' : '씨앗을 사러 가볼까요?'}</p>
      </Modal>,
    );
  };

  const ResultList = [
    {
      id: 1,
      title: '나의답안',
      contents: answer?.result?.reply,
      withButton: true,
    },
    {
      id: 2,
      title: '모범 답안',
      contents: answer?.result?.answer,
    },
    {
      id: 3,
      title: '피드백',
      contents: '',
    },
  ];

  return (
    <>
      <Button
        onClick={() => setSeeds((prev) => !prev)}
      >{`씨앗이 ${seeds ? '있' : '없'}을 경우`}</Button>
      {ResultList.map(({id, title, contents, withButton}, idx) => (
        <Fragment key={id}>
          <ListRow
            title={<ListRow.Title>{title}</ListRow.Title>}
            content={
              withButton ? (
                <ListRow.ContentsWithButton onClick={handleClickOpenModal}>
                  {contents}
                </ListRow.ContentsWithButton>
              ) : (
                <ListRow.Contents>{contents}</ListRow.Contents>
              )
            }
          />
          {ResultList.length - 1 === idx ? null : <Spacing />}
        </Fragment>
      ))}
    </>
  );
};

export default AnswerList;
