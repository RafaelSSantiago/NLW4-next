import {createContext, useState, ReactNode, useEffect} from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level:number;
    currentExperience: number;
    chanllengesCompleted: number;
    activeChanllenge: Challenge;
    levelUp: () => void;
    startNewChanllenge: () => void;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void
    closeLevelUpModal: () => void;
}

interface ChanllengesProviderProps{
    children: ReactNode;
    level: number,
    currentExperience: number,
    chanllengesCompleted: number,
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChanllengesProvider({
    children,
  ...rest
}: ChanllengesProviderProps){
    const [level, setLevel] =useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [chanllengesCompleted, setChanllengesComplete] = useState(rest.chanllengesCompleted ?? 0)

    const [activeChanllenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
                  
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() =>{
        Notification.requestPermission()
    }, [])

    useEffect(()=>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('chanllengesCompleted', String(chanllengesCompleted));
    }, [level,currentExperience, chanllengesCompleted]);

  function levelUp(){
    setLevel(level + 1);
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false)
  }

  function startNewChanllenge(){
     const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
     const challenge = challenges[randomChallengeIndex];

     setActiveChallenge(challenge)

     new Audio('./notification.mp3').play();

     if(Notification.permission === 'granted'){
         new Notification('Novo desafio',{
             body: `Valendo ${challenge.amount}xp!`
         })
     }
  }

  function resetChallenge(){
      setActiveChallenge(null)
  }

  function completeChallenge(){
        if(!activeChanllenge){
            return;
        }

        const { amount } = activeChanllenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience > experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp()
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChanllengesComplete(chanllengesCompleted + 1)
  }

    return(
        <ChallengesContext.Provider 
        value={{
            level, 
            currentExperience,
            chanllengesCompleted,
            levelUp,
            startNewChanllenge,
            activeChanllenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            closeLevelUpModal,
            }}
            >

            {children}

           {isLevelUpModalOpen && <LevelUpModal/> }
        </ChallengesContext.Provider>
    )
}
