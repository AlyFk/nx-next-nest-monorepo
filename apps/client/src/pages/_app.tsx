import AppProvider from 'app/providers';
import { AppProps } from 'next/app';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider pageProps={pageProps}>
      <Component {...pageProps} />
      <ToastContainer />
    </AppProvider>
  );
}

export default MyApp;
