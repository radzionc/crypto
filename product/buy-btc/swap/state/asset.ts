import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { Asset } from '../../chain/Asset'

export const { provider: AssetProvider, useState: useAsset } =
  getStateProviderSetup<Asset>('asset')
