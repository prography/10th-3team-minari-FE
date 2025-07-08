import {Suspense} from 'react';
import Loader from '@/components/Loader';

const MyPageLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <Suspense fallback={<Loader />}>
      <div>{children}</div>
    </Suspense>
  );
};
export default MyPageLayout;
