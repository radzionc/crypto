import { VStack } from '@lib/ui/css/stack'
import { useTradesQuery } from '../queries/useTradesQuery'
import { TradeItem } from './TradeItem'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'
import { NonEmptyOnly } from '@lib/ui/base/NonEmptyOnly'
import { Text } from '@lib/ui/text'
import { getErrorMessage } from '@lib/utils/getErrorMessage'
import { NextTrade } from './NextTrade'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

export const Trades = () => {
  const query = useTradesQuery()

  return (
    <>
      <NonEmptyOnly
        value={query.errors}
        render={(errors) => (
          <ShyWarningBlock title="Failed to get some trades">
            {errors.map((error, index) => (
              <VStack gap={20}>
                <Text key={index}>{getErrorMessage(error)}</Text>
              </VStack>
            ))}
          </ShyWarningBlock>
        )}
      />
      {query.isLoading && <Text color="supporting">Loading trades...</Text>}
      <NonEmptyOnly
        value={query.data}
        render={(trades) => (
          <SeparatedByLine gap={20}>
            <NextTrade lastTrade={getLastItem(trades)} />
            <VStack gap={20}>
              {trades.map((trade) => (
                <TradeItem key={trade.hash} value={trade} />
              ))}
            </VStack>
          </SeparatedByLine>
        )}
      />
    </>
  )
}
