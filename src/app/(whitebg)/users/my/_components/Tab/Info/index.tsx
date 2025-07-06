import InfoBox from '@/components/InfoBox';
import ProfileCard from '@/app/(whitebg)/users/my/_components/ProfileCard';
import {UsersReponse} from '@/apis/user';

const InfoTab = ({data}: {data: UsersReponse | null}) => {
  return (
    <div className="mg-top-24">
      <InfoBox>
        <ProfileCard
          name={data?.name}
          domain={data?.domain === 'FRONTEND' ? '프론트엔드' : '백엔드'}
          email={data?.email}
          uuid={data?.uuid}
        />
      </InfoBox>
    </div>
  );
};

export default InfoTab;
