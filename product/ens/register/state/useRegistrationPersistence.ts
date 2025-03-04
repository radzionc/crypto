import { useCallback } from 'react'
import { useAccount } from 'wagmi'

import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'

export type RegistrationCommitment = {
  name: string
  secret: `0x${string}`
  commitmentHash: `0x${string}`
  timestamp: number
  address: `0x${string}`
}

type RegistrationStore = Record<string, RegistrationCommitment>

export const useRegistrationPersistence = () => {
  const { address } = useAccount()

  const [registrationStore, setRegistrationStore] =
    usePersistentState<RegistrationStore>(
      PersistentStateKey.ENS_REGISTRATION_DATA,
      {},
    )

  const saveCommitment = useCallback(
    (commitment: RegistrationCommitment) => {
      setRegistrationStore((prevStore) => ({
        ...prevStore,
        [commitment.name]: commitment,
      }))
    },
    [setRegistrationStore],
  )

  const clearCommitment = useCallback(
    (name: string) => {
      setRegistrationStore((prevStore) => {
        const newStore = { ...prevStore }
        delete newStore[name]
        return newStore
      })
    },
    [setRegistrationStore],
  )

  const getStoredCommitment = useCallback(
    (name: string): RegistrationCommitment | null => {
      const commitment = registrationStore[name]

      // If no commitment exists
      if (!commitment) {
        return null
      }

      // If the stored address doesn't match the current address, return null
      if (address && commitment.address !== address) {
        clearCommitment(name)
        return null
      }

      // Check if commitment has expired (24 hours)
      const MAX_COMMITMENT_AGE = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      const commitmentAge = Date.now() - commitment.timestamp
      if (commitmentAge > MAX_COMMITMENT_AGE) {
        clearCommitment(name)
        return null
      }

      return commitment
    },
    [registrationStore, address, clearCommitment],
  )

  const hasValidStoredCommitment = useCallback(
    (name: string): boolean => {
      const commitment = getStoredCommitment(name)

      // If no commitment exists
      if (!commitment) {
        return false
      }

      // Check if commitment is ready for registration (after 60 seconds)
      const MIN_COMMITMENT_AGE = 60 * 1000 // 60 seconds in milliseconds
      const commitmentAge = Date.now() - commitment.timestamp
      return commitmentAge >= MIN_COMMITMENT_AGE
    },
    [getStoredCommitment],
  )

  return {
    saveCommitment,
    clearCommitment,
    getStoredCommitment,
    hasValidStoredCommitment,
  }
}
