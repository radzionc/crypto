import styled from 'styled-components'
import { feePriorities } from '../core/FeePriority'
import { HStack } from '@lib/ui/css/stack'
import { gwei } from '@lib/chain/evm/utils/gwei'
import { getFeePriorityColor } from '../utils/getFeePriorityColor'
import { Text } from '@lib/ui/text'
import { useTheme } from 'styled-components'
import { formatAmount } from '@lib/utils/formatAmount'
import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { round } from '@lib/ui/css/round'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { usePriorityFeesQuery } from '../../queries/usePriorityFeesQuery'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'

const Identifier = styled.div`
  ${sameDimensions(8)}
  ${round}
`

export const PriorityOptions = () => {
  const theme = useTheme()
  const query = usePriorityFeesQuery()

  return (
    <HStack
      fullWidth
      justifyContent="space-between"
      wrap="wrap"
      alignItems="center"
      gap={20}
    >
      {feePriorities.map((priority) => (
        <HStack alignItems="center" gap={8} key={priority}>
          <HStack alignItems="center" gap={6}>
            <Identifier
              style={{
                background: getFeePriorityColor(theme, priority).toCssValue(),
              }}
            />
            <Text color="supporting">{capitalizeFirstLetter(priority)}</Text>
          </HStack>
          <MatchQuery
            value={query}
            pending={() => <Spinner />}
            success={(value) => (
              <Text>
                {formatAmount(fromChainAmount(value[priority], gwei.decimals))}{' '}
                {gwei.name}
              </Text>
            )}
          />
        </HStack>
      ))}
    </HStack>
  )
}
