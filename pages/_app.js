import { GqlClientProvider } from '../components/GqlClientProvider'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <GqlClientProvider>
      <Component {...pageProps} />
    </GqlClientProvider>
  )
}

export default MyApp
