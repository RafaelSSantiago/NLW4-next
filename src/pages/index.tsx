import Head from 'next/head';


import { CompletedChanlenges } from "../components/CompletedChanlenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChanllegeBox } from "../components/ChanllegeBox";


import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it</title>
      </Head>

      <ExperienceBar />
      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChanlenges />
            <Countdown />
          </div>
          <div>
            <ChanllegeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}
