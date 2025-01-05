import { Asset } from '../../chain/Asset'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const { provider: AssetsProvider, useValue: useAssets } =
  getValueProviderSetup<Asset[]>('assets')
