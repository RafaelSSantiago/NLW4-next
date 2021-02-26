import Head from 'next/head';


import { CompletedChanlenges } from "../components/CompletedChanlenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { GetServerSideProps} from 'next';
import { ChanllegeBox } from "../components/ChanllegeBox";


import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChanllengesProvider } from '../contexts/ChanllengesContext';

interface HomeProps{
  level: number,
  currentExperience: number,
  chanllengesCompleted: number,
}

export default function Home(props:HomeProps) {
  return (
    <ChanllengesProvider
    level={props.level}
    currentExperience={props.currentExperience}
    chanllengesCompleted={props.chanllengesCompleted}
    >
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
    </ChanllengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentExperience, chanllengesCompleted}= ctx.req.cookies

  return{
    props:{
      level:Number(level),
      currentExperience:Number(currentExperience),
      chanllengesCompleted:Number(chanllengesCompleted),
    }
  }
}