import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Buttons from '../components/Buttons'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Buttons />
    </>
  );
};

export default MyApp
