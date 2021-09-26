import React, { useEffect } from 'react';
import '../assets/styles/index.global.scss';
import Head from 'next/head';
import '../../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Loader from '../components/Loader';
import { setUserFromSession } from '../utils/methods/login';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setUserFromSession();
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta name="description" content="Jobs App" />
      </Head>
      <Loader />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
