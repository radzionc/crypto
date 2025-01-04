import { VStack } from '@lib/ui/css/stack'
import { useTradesQuery } from '../queries/useTradesQuery'
import { TradeItem } from './TradeItem'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'
import { NonEmptyOnly } from '@lib/ui/base/NonEmptyOnly'
import { Text } from '@lib/ui/text'
import { getErrorMessage } from '@lib/utils/getErrorMessage'
import { NextTrade } from './NextTrade'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { TradesChart } from './chart/TradesChart'
import { useAssetPriceQuery } from '@lib/chain-ui/queries/useAssetPriceQuery'
import { primaryTradeAssetPriceProviderId } from '../../entities/Trade'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { getOppositeTrade } from '@lib/chain/utils/getOppositeTrade'
import { isGoodPrice } from '../utils/isGoodPrice'

export const Trades = () => {
  const tradesQuery = useTradesQuery()

  const priceQuery = useAssetPriceQuery({
    id: primaryTradeAssetPriceProviderId,
  })

  return (
    <>
      <NonEmptyOnly
        value={tradesQuery.errors}
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
      {tradesQuery.isLoading && (
        <Text color="supporting">Loading trades...</Text>
      )}
      <NonEmptyOnly
        value={tradesQuery.data}
        render={(trades) => (
          <VStack gap={40}>
            {!tradesQuery.isLoading && <TradesChart value={trades} />}
            <SeparatedByLine gap={20}>
              <MatchQuery
                value={priceQuery}
                success={(price) => {
                  const nextTradeType = getOppositeTrade(trades[0].type)

                  return (
                    <NextTrade
                      value={nextTradeType}
                      isGoodPrice={isGoodPrice({
                        trades,
                        tradeType: nextTradeType,
                        price,
                      })}
                      price={price}
                    />
                  )
                }}
              />
              <VStack gap={20}>
                {trades.map((trade) => (
                  <TradeItem key={trade.hash} value={trade} />
                ))}
              </VStack>
            </SeparatedByLine>
          </VStack>
        )}
      />
    </>
  )
}
