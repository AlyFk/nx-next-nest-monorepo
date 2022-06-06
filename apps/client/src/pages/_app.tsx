import AppProvider from 'app/providers';
import { AppProps } from 'next/app';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
