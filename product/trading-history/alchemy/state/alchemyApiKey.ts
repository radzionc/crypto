import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'

export const useAlchemyApiKey = () => {
  return usePersistentState<string | null>(
    PersistentStateKey.AlchemyApiKey,
    null,
  )
}
