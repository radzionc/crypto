import { gwei } from '@lib/chain/evm/utils/gwei'
import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { formatAmount } from '@lib/utils/formatAmount'
import { usePriorityFeeQuery } from '../queries/usePriorityFeeQuery'
import { Text } from '@lib/ui/text'

export const MaxPriorityFeePerGasTitle = () => {
  const query = usePriorityFeeQuery()

  return (
    <>
      maxPriorityFeePerGas{' '}
      <MatchQuery
        value={query}
        pending={() => <Spinner />}
        success={(value) => (
          <Text as="span" color="contrast">
            {' = '}
            {formatAmount(fromChainAmount(value, gwei.decimals))} {gwei.name}
          </Text>
        )}
      />
    </>
  )
}
