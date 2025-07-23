import styles from './JoinExperience.module.css';
import Image from 'next/image';
import {UserExperienceLevel, UserDomain} from '@/stores/userStore';
import {useUserJoinContext} from '@/contexts/UserJoinProvider';
import {USER_DOMAINS, USER_EXPERIENCES, USER_EXPERIENCES_EXISTENCE} from '@/constants/user';
import {useState} from 'react';

const JoinExperience = () => {
  const {joinForm, setJoinForm} = useUserJoinContext();
  const [hasExperience, setHasExperience] = useState<boolean | null>(null);
  const onClickCard = (key: string, value: UserExperienceLevel | UserDomain) => {
    setJoinForm({...joinForm, [key]: value});
  };
  const onClickExperience = (value: boolean) => {
    setHasExperience(value);
    if (!value) {
      setJoinForm({...joinForm, studyExperienceLevel: 'NONE'});
    }
  };
  return (
    <div>
      <div className={styles['question-box']}>
        <div className="title-xs">개발과 얼마나 친하신가요?</div>
        <div className="body-md txt-tertiary">비슷한 경력의 질문을 추천해드릴게요.</div>
      </div>
      <div className={styles['select__wrap']}>
        {USER_EXPERIENCES_EXISTENCE.map((item, index) => (
          <div
            key={index}
            style={{width: '50%'}}
            className={styles[`select__item${hasExperience === item.value ? '-active' : ''}`]}
            onClick={() => onClickExperience(item.value)}
          >
            <div className="label-lg pre">{item.label}</div>
          </div>
        ))}
      </div>
      {hasExperience && (
        <div className={styles['select__wrap']}>
          {USER_EXPERIENCES.map((item, index) => (
            <div
              key={index}
              style={{width: '25%'}}
              className={
                styles[
                  `select__item${joinForm.studyExperienceLevel === item.value ? '-active' : ''}`
                ]
              }
              onClick={() => onClickCard('studyExperienceLevel', item.value as UserExperienceLevel)}
            >
              <Image
                src={
                  joinForm.studyExperienceLevel === item.value
                    ? item.imageActive
                    : item.imageInactive
                }
                alt=""
              />
              <div className="label-lg pre">{item.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className={`${styles['question-box']} mg-top-64`}>
        <div className="title-xs">어떤 분야의 질문이 궁금하세요?</div>
        <div className="body-md txt-tertiary">선택한 분야에 맞춘 질문을 보내드릴게요.</div>
      </div>
      <div className={styles['select__wrap']}>
        {USER_DOMAINS.map((item, index) => (
          <div
            key={index}
            style={{width: '50%'}}
            className={styles[`select__item${joinForm.domain === item.value ? '-active' : ''}`]}
            onClick={() => onClickCard('domain', item.value as UserDomain)}
          >
            <div className="label-lg pre">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinExperience;
