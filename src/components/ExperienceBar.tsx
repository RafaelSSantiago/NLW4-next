  import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChanllengesContext';
import styles from'../styles/components/ExperienceBar.module.css';
  
  export function ExperienceBar() {
    const {currentExperience,experienceToNextLevel} = useContext(ChallengesContext);


    const percenteToNextLevel = Math.round(currentExperience * 100 ) / experienceToNextLevel;

    return (
      <header className={styles.experienceBar}>
        <span>0 xp</span>
        <div>
          <div style={{ width: `${percenteToNextLevel}%` }}>
            <span className={styles.currentExperience} style={{ left:`${percenteToNextLevel}` }}>
              {currentExperience} xp
            </span>  
          </div> 
        </div>
        <span>{experienceToNextLevel} xp</span>
      </header>
    )
  }