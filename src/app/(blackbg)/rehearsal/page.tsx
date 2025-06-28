'use client';

import MainPage from './_components/Main';
import SettingPage from './_components/Setting';
import {useRehearsal} from '@/contexts/RehearsalProvider';

const RehearsalPage = () => {
  const {isSetting} = useRehearsal();

  return <>{isSetting ? <SettingPage /> : <MainPage />}</>;
};

export default RehearsalPage;
