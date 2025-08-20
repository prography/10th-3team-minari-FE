'use client';

import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
  QueryClientProvider,
  type Query,
} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {useEffect} from 'react';
import {initMixpanel} from '@/lib/mixpanelClient';
import process from 'node:process';

const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    dehydrate: {
      // 기본적으로 성공한 쿼리만 포함됩니다.
      // 여기에는 보류 중인 쿼리도 포함됩니다.
      shouldDehydrateQuery: (query: Query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
    },
  },
};

function makeQueryClient() {
  return new QueryClient(queryClientOptions);
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // 서버: 항상 새로운 쿼리 클라이언트를 만듭니다.
    return makeQueryClient();
  } else {
    // 브라우저: 아직 없는 경우 새 쿼리 클라이언트를 만듭니다.
    // 이는 React가 초기 렌더링 중에 중단될 경우 새 클라이언트를 다시 만들지 않도록 매우 중요합니다.
    // 쿼리 클라이언트 생성 아래에 중단 경계가 있는 경우에는 필요하지 않을 수 있습니다.
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
}

export default function Providers({children}: {children: React.ReactNode}) {
  const queryClient = getQueryClient();
  useEffect(() => {
    initMixpanel();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
