import {createContext, useState, ReactNode, useEffect} from 'react'
import challenges from '../../challenges.json';

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
}

interface ChanllengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChanllengesProvider({children}: ChanllengesProviderProps){
    const [level, setLevel] =useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [chanllengesCompleted, setChanllengesComplete] = useState(0)

    const [activeChanllenge, setActiveChallenge] = useState(null)
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() =>{
        Notification.requestPermission()
    }, [])

  function levelUp(){
    setLevel(level + 1);
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
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}
