import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'

export const useAddresses = () => {
  return usePersistentState<string[]>(PersistentStateKey.Addresses, [])
}
