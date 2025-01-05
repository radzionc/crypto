import { useQuery } from '@tanstack/react-query'
import { Asset } from '../../chain/Asset'
import { thorChainIds, thorChainRecord } from '../../chain/config'
import { queryUrl } from '@lib/utils/query/queryUrl'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'
import { isOneOf } from '@lib/utils/array/isOneOf'

type ThorPoolStatus = 'Available' | 'Staged'

type ThorPool = {
  asset: string
  status: ThorPoolStatus
}

const thorPoolsUrl = 'https://thornode.ninerealms.com/thorchain/pools'

const fromThorAsset = (thorAsset: string): Asset | undefined => {
  const [thorChainIdString, asset] = thorAsset.split('.')

  const thorChainId = isOneOf(thorChainIdString, thorChainIds)
  if (!thorChainId) return

  const chainId = thorChainRecord[thorChainId]

  const [symbol, address] = asset.split('-')

  return {
    chainId,
    symbol,
    ...(address ? { address: address.toLowerCase() } : {}),
  }
}

export const useAssetsQuery = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const pools: ThorPool[] = await queryUrl<ThorPool[]>(thorPoolsUrl)

      return withoutUndefined(
        pools
          .filter(({ status }) => status === 'Available')
          .map(({ asset }) => fromThorAsset(asset)),
      )
    },
  })
}
