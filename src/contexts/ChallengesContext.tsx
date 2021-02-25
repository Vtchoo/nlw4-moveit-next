import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'
import getRandomItemFromArray from '../shared/getRandomItemFromArray'

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
}

interface ChallengeProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengeProviderProps) {

    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

	function levelUp() {
		setLevel(level + 1)
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
                completeChallenge
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}
