import {
  PersistentStateKey,
  usePersistentState,
} from '../../../state/persistentState'

export const useAreAddressesVisible = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.AreAddressesVisible,
    true,
  )
}
