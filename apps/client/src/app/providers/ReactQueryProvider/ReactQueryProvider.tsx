import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface ReactQueryProviderProps {
  children?: React.ReactNode;
  client?: QueryClient;
}
const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({
  children,
  client,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  );

  return (
    <QueryClientProvider client={client || queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
