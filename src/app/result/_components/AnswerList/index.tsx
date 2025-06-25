import {Fragment} from 'react';
import ListRow from '../ListRow';
import Spacing from '@/components/Spacing';
import type {AnswerType} from '@/apis/answer';
import type {ApiResponse} from '@/apis/instance/APIClient';

const AnswerList = ({answer}: {answer: ApiResponse<AnswerType> | null}) => {
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
      {ResultList.map(({id, title, contents, withButton}, idx) => (
        <Fragment key={id}>
          <ListRow
            title={<ListRow.Title>{title}</ListRow.Title>}
            content={
              withButton ? (
                <ListRow.ContentsWithButton>{contents}</ListRow.ContentsWithButton>
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
