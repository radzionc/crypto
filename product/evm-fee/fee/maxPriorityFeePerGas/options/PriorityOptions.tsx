import { gwei } from '@lib/chain/evm/utils/gwei'
import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { HStack } from '@lib/ui/css/stack'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { formatAmount } from '@lib/utils/formatAmount'
import { useTheme } from 'styled-components'
import styled from 'styled-components'

import { usePriorityFeesQuery } from '../../queries/usePriorityFeesQuery'
import { feePriorities } from '../core/FeePriority'
import { getFeePriorityColor } from '../utils/getFeePriorityColor'

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
