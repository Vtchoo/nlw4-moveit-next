import { createContext, ReactNode, useState } from 'react'
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

	function levelUp() {
		setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallenge = getRandomItemFromArray(challenges)
        setActiveChallenge(randomChallenge)
    }

    function resetChallenge() {
        setActiveChallenge(null)
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
                resetChallenge
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}
