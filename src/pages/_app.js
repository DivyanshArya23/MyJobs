import React, { useEffect } from 'react';
import '../assets/styles/index.global.scss';
import Head from 'next/head';
import { ToastProvider } from 'react-toast-notifications';
import '../../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Loader from '../components/Loader';
import { setUserFromSession } from '../utils/methods/login';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setUserFromSession();
    document.documentElement.style.setProperty(
      '--scrollColor',
      '#A9AFBC 0% 0% no-repeat padding-box'
    );
  }, []);

  return (
    <Provider store={store}>
      <ToastProvider autoDismiss autoDismissTimeout={8000}>
        <Head>
          <meta name="description" content="Jobs App" />
        </Head>
        <Loader />
        <Component {...pageProps} />
      </ToastProvider>
    </Provider>
  );
}

export default MyApp;
