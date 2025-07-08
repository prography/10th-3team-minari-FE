import TopBar from '@/app/(whitebg)/users/my/_components/Heatmap/TopBar';
import Blocks from '@/app/(whitebg)/users/my/_components/Heatmap/Blocks';
import BlockDetail from '@/app/(whitebg)/users/my/_components/Heatmap/BlockDetail';
import {useUserHeatmapContext} from '@/contexts/UserHeatmapProvider';
import Loader from '@/components/Loader';

const Heatmap = () => {
  const {mapLoading} = useUserHeatmapContext();
  return (
    <div>
      {mapLoading ? (
        <div className="mg-top-32" style={{height: '100px'}}>
          <Loader />
        </div>
      ) : (
        <>
          <TopBar />
          <Blocks />
          <BlockDetail />
        </>
      )}
    </div>
  );
};

export default Heatmap;
