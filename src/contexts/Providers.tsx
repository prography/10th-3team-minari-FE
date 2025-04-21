import React from 'react';
import ClientProviders from './ClientProviders';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <ClientProviders>{children}</ClientProviders>
    </>
  );
};

export default Providers;
