import styles from './JoinExperience.module.css';
import Image from 'next/image';
import {UserExperienceLevel, UserDomain} from '@/stores/userStore';
import {useUserJoinContext} from '@/contexts/UserJoinProvider';
import {USER_DOMAINS, USER_EXPERIENCES} from '@/constants/user';

const JoinExperience = () => {
  const {joinForm, setJoinForm} = useUserJoinContext();
  const onClickCard = (key: string, value: UserExperienceLevel | UserDomain) => {
    setJoinForm({...joinForm, [key]: value});
  };
  return (
    <div>
      <div className={styles['question-box']}>
        <div className="title-xs">개발 공부는 얼마나 하셨어요?</div>
        <div className="body-md txt-tertiary">비슷한 경력의 질문을 추천해드릴게요.</div>
      </div>
      <div className={styles['select__wrap']}>
        {USER_EXPERIENCES.map((item, index) => (
          <div
            key={index}
            style={{width: '25%'}}
            className={
              styles[`select__item${joinForm.studyExperienceLevel === item.value ? '-active' : ''}`]
            }
            onClick={() => onClickCard('studyExperienceLevel', item.value as UserExperienceLevel)}
          >
            <Image
              src={
                joinForm.studyExperienceLevel === item.value ? item.imageActive : item.imageInactive
              }
              alt=""
            />
            <div className="label-lg">{item.label}</div>
          </div>
        ))}
      </div>

      <div className={styles['question-box']}>
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
            <div className="label-lg">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinExperience;
