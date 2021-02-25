import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChanllengesContext";

let coutdownTimeout: NodeJS.Timeout;

interface CountdownContextData{
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isactive: boolean,
    startCountdown: () => void,
    resetCountdown: ()  => void,
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children}: CountdownProviderProps){
    const {startNewChanllenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isactive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
  
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
      }
    
      function resetCountdown() {
        clearTimeout(coutdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60);
      }
    
      useEffect(() => {
        if (isactive && time > 0) {
          coutdownTimeout = setTimeout(() => {
            setTime(time - 1)
          }, 1000)
        } else if (isactive && time === 0) {
          setHasFinished(true);
          setIsActive(false);
          startNewChanllenge();
        }
      }, [isactive, time])

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isactive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}
