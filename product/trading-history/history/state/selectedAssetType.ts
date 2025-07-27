import { AssetType } from '../../entities/Trade'
import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'

export const useSelectedAssetType = () => {
  return usePersistentState<AssetType>(
    PersistentStateKey.SelectedAssetType,
    'ETH',
  )
}
