import React from 'react';
import Image from 'next/image';
import Minari from '@/assets/minari-black.svg';

function JoinPageTitle(props: {step: number}) {
  const pageTexts = [
    {title: '미나리에 오신 것을 환영해요', desc: '같이 미나리 심어주실래요?'},
    {
      title: '매일 면접 알림을 받아보시겠어요?',
      desc: '매일 오전 8시, 입력하신 메일로 알려드릴게요!',
    },
    {
      title: '간단한 입력으로 미나리와 함께해요',
      desc: '이메일로 매일 아침 8시 미나리를 보내드릴게요.',
    },
    {
      title: '조금 더 나를 알려주세요',
      desc: '설정해두면, 내 상황에 맞는 질문을 준비해드릴게요.\r\n이후에 언제든 설정에서 다시 바꿀 수 있어요.',
    },
    {
      title: '오늘의 첫 미나리를 심을 준비가 되었어요',
      desc: '작은 시작이 큰 변화의 씨앗이 될 거예요.',
    },
  ];
  return (
    <div>
      <div className="fx">
        <span className="title-md txt-primary pre">{pageTexts[props.step].title}</span>
        <span className="fx-align-center">
          <Image src={Minari} alt="" className="mg-left-4" width={28} />
        </span>
      </div>
      <div className="body-lg txt-secondary mg-top-4" style={{whiteSpace: 'pre'}}>
        {pageTexts[props.step].desc}
      </div>
    </div>
  );
}

export default JoinPageTitle;
