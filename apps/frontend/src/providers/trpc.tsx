import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFetch, httpBatchLink, loggerLink } from '@trpc/client';
import { api } from '@utils/helpers/trpc';
import React, { ReactNode, useState } from 'react';

interface IProps {
  children: ReactNode;
}

const getAPIUrl = () => {
  if (import.meta.env.API_URL != null) return `https://${import.meta.env.API_URL}`;
  return `http://localhost:${import.meta.env.PORT ?? 5000}`;
};

const TRPCProvider: React.FC<IProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink(),
        httpBatchLink({
          url: `${getAPIUrl()}/v1`,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: 'include',
            });
          },
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
};

export default TRPCProvider;
