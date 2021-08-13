import { AppProps } from 'next/app'
import '../styles/index.css'
import '../styles/prism-okaidia.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
