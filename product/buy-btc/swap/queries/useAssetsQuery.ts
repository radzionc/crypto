import { useQuery } from '@tanstack/react-query'
import { Asset } from '../../chain/Asset'
import { ChainId, thorNetworkPrefix } from '../../chain/config'
import { queryUrl } from '@lib/utils/query/queryUrl'
import { withoutUndefined } from '@lib/utils/array/withoutUndefined'
import { mirrorRecord } from '@lib/utils/record/mirrorRecord'

type ThorPoolStatus = 'Available' | 'Staged'

type ThorPool = {
  asset: string
  status: ThorPoolStatus
}

const thorPoolsUrl = 'https://thornode.ninerealms.com/thorchain/pools'

const fromThorAsset = (thorAsset: string): Asset | undefined => {
  const [network, assetPart] = thorAsset.split('.')

  const chainId = mirrorRecord(thorNetworkPrefix)[network]
  if (!chainId) return

  const [, address] = assetPart.split('-')

  return {
    chainId: Number(chainId) as ChainId,
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
