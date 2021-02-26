import '../Styles/global.css'

import { ChallengesContext, ChanllengesProvider } from '../contexts/ChanllengesContext';
import { CountdownProvider } from '../contexts/CountdownContext'

function MyApp({ Component, pageProps }) {
  return (
        <Component {...pageProps} />
  )
}

export default MyApp
