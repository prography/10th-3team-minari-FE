import {getAnswer} from '@/apis/answer';
import {Fragment} from 'react';
import ListRow from '../ListRow';
import Spacing from '@/components/Spacing';

const AnswerList = async () => {
  const answer = await getAnswer('1', 5);

  const ResultList = [
    {
      id: 1,
      title: '나의답안',
      contents: answer?.result?.reply,
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
      {ResultList.map(({id, title, contents}, idx) => (
        <Fragment key={id}>
          <ListRow
            title={<ListRow.Title>{title}</ListRow.Title>}
            content={<ListRow.Contents>{contents}</ListRow.Contents>}
          />
          {ResultList.length - 1 === idx ? null : <Spacing />}
        </Fragment>
      ))}
    </>
  );
};

export default AnswerList;
