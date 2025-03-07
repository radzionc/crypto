import { Years } from '@lib/utils/time/types'

import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'

const defaultRegistrationDuration = 1

export const useRegistrationDuration = () => {
  return usePersistentState<Years>(
    PersistentStateKey.RegistrationDuration,
    defaultRegistrationDuration,
  )
}
