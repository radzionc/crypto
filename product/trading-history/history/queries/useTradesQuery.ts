import { useQueries } from '@tanstack/react-query'
import { useAddresses } from '../state/addresses'
import { useQueriesToEagerQuery } from '@lib/ui/query/hooks/useQueriesToEagerQuery'
import { tradingHistoryConfig } from '../config'
import { useAlchemyApiKey } from '../../alchemy/state/alchemyApiKey'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { order } from '@lib/utils/array/order'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { getAlchemyClient } from '../../alchemy/utils/getAlchemyClient'
import { noRefetchQueryOptions } from '@lib/ui/query/utils/options'
import { getTrades } from '../../alchemy/utils/getTrades'
import { Trade } from '../../entities/Trade'

const joinData = (items: Trade[][]) =>
  withoutDuplicates(
    order(items.flat(), ({ timestamp }) => timestamp, 'desc'),
    (a, b) => a.hash === b.hash,
  )

export const useTradesQuery = () => {
  const [addresses] = useAddresses()

  const [apiKey] = usePresentState(useAlchemyApiKey())

  const queries = useQueries({
    queries: tradingHistoryConfig.networks.flatMap((network) => {
      const alchemy = getAlchemyClient({ network, apiKey })

      return addresses.map((address) => ({
        queryKey: ['txs', network, address],
        queryFn: async () => {
          return getTrades({
            alchemy,
            address,
          })
        },
        ...noRefetchQueryOptions,
      }))
    }),
  })

  return useQueriesToEagerQuery({
    queries,
    joinData,
  })
}
