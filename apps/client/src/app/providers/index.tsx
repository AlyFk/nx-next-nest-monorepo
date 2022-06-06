import { ReactQueryProvider, HydrateProvider } from './ReactQueryProvider';

interface AppProviderProps {
  children?: React.ReactNode;
  pageProps: any;
}
const AppProvider: React.FC<AppProviderProps> = ({ children, pageProps }) => (
  <ReactQueryProvider>
    <HydrateProvider state={pageProps.dehydratedState}>
      {children}
    </HydrateProvider>
  </ReactQueryProvider>
);

export default AppProvider;
export { ReactQueryProvider, HydrateProvider };
