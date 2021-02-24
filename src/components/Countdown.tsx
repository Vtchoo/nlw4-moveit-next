import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Countdown.module.css'

const DEFAULT_CYCLE_TIME_IN_MINUTES = .1

let countdownTimeout: NodeJS.Timeout

export default function Countdown() {

    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(60 * DEFAULT_CYCLE_TIME_IN_MINUTES)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setTime(60 * DEFAULT_CYCLE_TIME_IN_MINUTES)
    }

    useEffect(() => {

        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }

    }, [isActive, time])



    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ?
                <button disabled className={`${styles.countdownButton}`} >
                    Cycle finished!
                </button>
                :
                isActive ?
                    <button type='button' className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
                        Stop cycle
                    </button>
                    :
                    <button type='button' className={styles.countdownButton} onClick={startCountdown}>
                        Start cycle
                    </button>
                
            }
        </div>
    )
}