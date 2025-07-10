import {Suspense} from 'react';
import Loader from '@/components/Loader';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '씨앗',
};

const SeedsLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <Suspense fallback={<Loader />}>
      <div>{children}</div>
    </Suspense>
  );
};
export default SeedsLayout;
