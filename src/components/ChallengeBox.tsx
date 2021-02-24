import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {

    const hasActiveChallenge = true

    return (
        <div className={styles.challengeBoxContainer}>
            {hasActiveChallenge ?
                <div className={styles.challengeActive}>
                    <header>Earn 400 xp</header>
                    <main>
                        <img src="icons/body.svg" alt="" />
                        <strong>New challenge</strong>
                        <p>Get up and walk for 3 minutes</p>
                    </main>
                    <footer>
                        <button
                            type='button'
                            className={styles.challengeFailedButton}
                        >
                            I failed
                        </button>
                        <button
                            type='button'
                            className={styles.challengeSucceededButton}
                        >
                            I completed!
                        </button>
                    </footer>
                </div>
                :
                <div className={styles.challengeNotActive}>
                    <strong>Finish a cycle to get new challenges to be completed</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="level up" />
                    Level up by completing challenges!
                </p>
                </div>
            }
        </div>
    )
}