import styles from '../styles/components/ExperienceBar.module.css'

const ExperienceBar = (props: any) => {
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: '50%' }}></div>

                <span className={styles.currentExperience} style={{ left: '50%' }}>
                    300xp
                </span>
            </div>
            <span>600 xp</span>
        </header>
    )
}

export { ExperienceBar }