import Spacing from '@/components/Spacing';
import Question from './_components/Question';
import Keywrod from './_components/Keyword';
import ListRow from './_components/ListRow';
import {Fragment} from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import ArrowBlack from '@/assets/icon/arrow-black.svg';

const ReharsalResultPage = () => {
  const keywrods = ['키워드1', '키워드2', '키워드3'];

  const ResultList = [
    {
      id: 1,
      title: '나의답안',
      contents:
        '자기 개발을 위한 5가지 핵심 습관은 목표 설정, 긍정적 사고, 건강 관리, 지속적인 학습, 그리고 작은 목표 달성입니다. 먼저, 명확한 목표를 설정함으로써 자신의 방향을 확립할 수 있습니다. 긍정적인 사고는 어려움을 극복하고 동기부여를 유지하는 데 도움을 줍니다. 건강 관리는 신체적, 정신적 에너지를 유지하는 데 필수적입니다. 또한, 지속적인 학습을 통해 새로운 지식을 습득하고 성장할 수 있으며, 작은 목표를 달성하면서 자신감을 쌓을 수 있습니다.',
    },
    {
      id: 2,
      title: '모범 답안',
      contents:
        '자기 개발을 위한 5가지 핵심 습관은 목표 설정, 긍정적 사고, 건강 관리, 지속적인 학습, 그리고 작은 목표 달성입니다. 먼저, 명확한 목표를 설정함으로써 자신의 방향을 확립할 수 있습니다. 긍정적인 사고는 어려움을 극복하고 동기부여를 유지하는 데 도움을 줍니다. 건강 관리는 신체적, 정신적 에너지를 유지하는 데 필수적입니다. 또한, 지속적인 학습을 통해 새로운 지식을 습득하고 성장할 수 있으며, 작은 목표를 달성하면서 자신감을 쌓을 수 있습니다.',
    },
    {
      id: 3,
      title: '피드백',
      contents:
        '자기 개발을 위한 5가지 핵심 습관은 목표 설정, 긍정적 사고, 건강 관리, 지속적인 학습, 그리고 작은 목표 달성입니다. 먼저, 명확한 목표를 설정함으로써 자신의 방향을 확립할 수 있습니다. 긍정적인 사고는 어려움을 극복하고 동기부여를 유지하는 데 도움을 줍니다. 건강 관리는 신체적, 정신적 에너지를 유지하는 데 필수적입니다. 또한, 지속적인 학습을 통해 새로운 지식을 습득하고 성장할 수 있으며, 작은 목표를 달성하면서 자신감을 쌓을 수 있습니다.',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.core}>
        <Question />

        <div className={styles.list}>
          <ListRow
            title={<ListRow.Title>이런 단어들이 포함되면 좋아요</ListRow.Title>}
            content={
              <ListRow.Contents>
                {keywrods.map((v, index) => (
                  <Keywrod key={`${v}-${index}`}>{v}</Keywrod>
                ))}
              </ListRow.Contents>
            }
          />
          <Spacing />

          {ResultList.map(({id, title, contents}, idx) => (
            <Fragment key={id}>
              <ListRow
                title={<ListRow.Title>{title}</ListRow.Title>}
                content={<ListRow.Contents>{contents}</ListRow.Contents>}
              />
              {ResultList.length - 1 === idx ? null : <Spacing />}
            </Fragment>
          ))}
        </div>
      </div>

      <button className={`${styles.button} label-lg`}>
        <>내가 심은 미나리 보러가기</>
        <Image src={ArrowBlack} alt="icon" width={24} height={24} />
      </button>
    </div>
  );
};

export default ReharsalResultPage;
