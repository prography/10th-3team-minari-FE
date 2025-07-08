import InfoBox from '@/components/InfoBox';
import ProfileCard from '@/app/(whitebg)/users/my/_components/ProfileCard';
import Heatmap from '@/app/(whitebg)/users/my/_components/Heatmap';
import {useUserHeatmapContext} from '@/contexts/UserHeatmapProvider';

const InfoTab = () => {
  const {userData} = useUserHeatmapContext();
  return (
    <div className="mg-top-24">
      <InfoBox>
        <ProfileCard
          name={userData?.name}
          domain={userData?.domain === 'FRONTEND' ? '프론트엔드' : '백엔드'}
          email={userData?.email}
          uuid={userData?.uuid}
          days={userData?.dayCount}
        />
      </InfoBox>
      <div className="mg-top-24 title-sm">{userData?.name}님의 미나리밭</div>
      <div className="body-md">
        내가 심은 날의 미나리를 클릭해서 나의 리허설 히스토리를 확인해요.
      </div>
      <div className="mg-top-20">
        <Heatmap />
      </div>
    </div>
  );
};

export default InfoTab;
