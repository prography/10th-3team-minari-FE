'use client';

import {useEffect} from 'react';
import {useDeviceStore} from '@/stores/devicsStore';
import useMedia from '@/hooks/useMedia';
import RehearsalHeader from '../_components/Header/RehearsalHeader';
import OptionGroup from './_components/OptionGroup/OptionGroup';
import OnlyVideo from '../_components/Video/OnlyVideo';

const ReharsalSettingPage = () => {
  const {selectDevice} = useDeviceStore();
  const {videoInput, audioInput} = selectDevice;
  const {mediaStreamStatus, startMedia} = useMedia();

  useEffect(() => {
    if (mediaStreamStatus === 'idle' || mediaStreamStatus === 'pending') {
      void startMedia({videoInput, audioInput});
    }
  }, []);

  return (
    <div>
      <RehearsalHeader
        subtitle={<RehearsalHeader.Subtitle>오늘의 미나리 키워드</RehearsalHeader.Subtitle>}
        title={<RehearsalHeader.Title>키워드</RehearsalHeader.Title>}
        leftView={<OptionGroup />}
      />
      <OnlyVideo />
    </div>
  );
};

export default ReharsalSettingPage;
