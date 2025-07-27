import { useQueriesToEagerQuery } from '@lib/ui/query/hooks/useQueriesToEagerQuery'
import { noRefetchQueryOptions } from '@lib/ui/query/utils/options'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { order } from '@lib/utils/array/order'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { useQueries } from '@tanstack/react-query'

import { useAlchemyApiKey } from '../../alchemy/state/alchemyApiKey'
import { getAlchemyClient } from '../../alchemy/utils/getAlchemyClient'
import { getTrades } from '../../alchemy/utils/getTrades'
import { AssetType, Trade } from '../../entities/Trade'
import { tradingHistoryConfig } from '../config'
import { useAddresses } from '../state/addresses'

const joinData = (items: Trade[][], assetType: AssetType) => {
  const allTrades = withoutDuplicates(
    order(items.flat(), ({ timestamp }) => timestamp, 'desc'),
    (a, b) => a.hash === b.hash,
  )

  // Filter trades by asset type
  return allTrades.filter((trade) => trade.assetType === assetType)
}

type UseTradesQueryInput = {
  assetType: AssetType
}

export const useTradesQuery = ({ assetType }: UseTradesQueryInput) => {
  const [addresses] = useAddresses()

  const [apiKey] = usePresentState(useAlchemyApiKey())

  const queries = useQueries({
    queries: tradingHistoryConfig.networks.flatMap((network) => {
      const alchemy = getAlchemyClient({ network, apiKey })

      return addresses.map((address) => ({
        queryKey: ['txs', network, address, assetType],
        queryFn: async () => {
          return getTrades({
            alchemy,
            address,
            network,
          })
        },
        ...noRefetchQueryOptions,
      }))
    }),
  })

  return useQueriesToEagerQuery({
    queries,
    joinData: (items) => joinData(items, assetType),
  })
}
