import InfoBox from '@/components/InfoBox';
import ProfileCard from '@/app/(whitebg)/users/my/_components/ProfileCard';
import {UsersReponse} from '@/apis/user';
import Heatmap from '@/app/(whitebg)/users/my/_components/Heatmap';
import {UserHeatmapProvider} from '@/contexts/UserHeatmapProvider';

const InfoTab = ({data}: {data: UsersReponse | null}) => {
  return (
    <UserHeatmapProvider>
      <div className="mg-top-24">
        <InfoBox>
          <ProfileCard
            name={data?.name}
            domain={data?.domain === 'FRONTEND' ? '프론트엔드' : '백엔드'}
            email={data?.email}
            uuid={data?.uuid}
          />
        </InfoBox>
        <div className="mg-top-24 title-sm">{data?.name}님의 미나리밭</div>
        <div className="body-md">
          내가 심은 날의 미나리를 클릭해서 나의 리허설 히스토리를 확인해요.
        </div>
        <div className="mg-top-20">
          <Heatmap />
        </div>
      </div>
    </UserHeatmapProvider>
  );
};

export default InfoTab;
