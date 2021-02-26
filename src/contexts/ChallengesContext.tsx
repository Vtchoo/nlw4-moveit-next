import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'
import getRandomItemFromArray from '../shared/getRandomItemFromArray'
import cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengeContextData {
    level: number
    currentExperience: number
    experienceToNextLevel: number
    challengesCompleted: number
    levelUp: () => void
    startNewChallenge: () => void
    activeChallenge: Challenge
    resetChallenge: () => void
    completeChallenge: () => void
    closeLevelUpModal: () => void
}

interface ChallengeProviderProps {
    children: ReactNode
    level: number
    currentExperience: number
    challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children, ...props }: ChallengeProviderProps) {

    const [level, setLevel] = useState(props.level || 1)
    const [currentExperience, setCurrentExperience] = useState(props.currentExperience || 0)
    const [challengesCompleted, setChallengesCompleted] = useState(props.challengesCompleted || 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        cookies.set('level', level.toString())
        cookies.set('currentExperience', currentExperience.toString())
        cookies.set('challengesCompleted', challengesCompleted.toString())
    }, [level, currentExperience, challengesCompleted])

	function levelUp() {
        setLevel(level + 1)
        setIsLevelModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallenge = getRandomItemFromArray(challenges)
        setActiveChallenge(randomChallenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted')
            new Notification('New Challenge', { body: `Earn ${randomChallenge.amount} XP` })
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        
        if (!activeChallenge)
            return
        
        const { amount } = activeChallenge
        
        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp() 
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                experienceToNextLevel,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
            }}
        >
            {children}

            {isLevelModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}
