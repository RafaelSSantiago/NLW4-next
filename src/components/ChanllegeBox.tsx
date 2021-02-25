import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChanllengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChanllegeBox.module.css';

export function ChanllegeBox(){
const { activeChanllenge,resetChallenge,completeChallenge } = useContext(ChallengesContext);
const {resetCountdown} = useContext(CountdownContext)

function handleChallegeSucceeded(){
completeChallenge();
resetCountdown();
}

function handleChallengeFailed(){
    resetChallenge();
    resetCountdown();
}
    return (
        <div className={styles.challengeBoxContainer}>
        { activeChanllenge ? (
            <div className={styles.challengeActive}>
                <header>Ganhe {activeChanllenge.amount} xp</header>

                <main>
                    <img src={`icons/${activeChanllenge.type}.svg`} />
                    <strong>Novo desafio</strong>
                    <p>{activeChanllenge.description}</p>
                </main>

            <footer>
                <button 
                type="button"
                className={styles.challengeFailedButton}
                onClick={handleChallengeFailed}
                >
                    Falhei
                    </button>
                <button
                 type="button"
                 className={styles.challengeSucceededButton}
                 onClick={handleChallegeSucceeded}
                >
                    Completei
                    </button>
            </footer>
            </div>
        ) : (
            
            <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
                <img src="icons/level-up.svg" alt="Level"/>
                Avance de level completando desafios
            </p>
        </div>
            
        )}
        </div>
    )
}
