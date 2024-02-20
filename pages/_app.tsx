import 'rsuite/dist/rsuite.min.css';
import 'styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { CustomProvider } from 'rsuite';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Storage Subnet</title>
        <link rel='preconnect' href='https://fonts.googleapis.com'></link>
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        ></link>
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <CustomProvider theme='dark'>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </CustomProvider>
    </>
  );
}
