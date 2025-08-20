import React from 'react';
import ClientProviders from './ClientProviders';
import MixpanelProvider from '@/contexts/MixpanelProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({children}: ProvidersProps) => {
  return (
    <>
      <ClientProviders>
        <MixpanelProvider>{children}</MixpanelProvider>
      </ClientProviders>
    </>
  );
};

export default Providers;
