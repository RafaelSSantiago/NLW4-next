import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChanllengesContext';
import styles from '../styles/components/CompletedChanlengs.module.css';

export function CompletedChanlenges(){
    const {chanllengesCompleted} = useContext(ChallengesContext);

    return (
        <div className={styles.CompletedChanlengesContainer}>
            <span>Desafios completos</span>
            <span>{chanllengesCompleted}</span>
        </div>
    )
}
