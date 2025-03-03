import { getOppositeTrade } from '@lib/chain/utils/getOppositeTrade'
import { useAssetPriceQuery } from '@lib/chain-ui/queries/useAssetPriceQuery'
import { NonEmptyOnly } from '@lib/ui/base/NonEmptyOnly'
import { VStack } from '@lib/ui/css/stack'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'
import { Text } from '@lib/ui/text'
import { getErrorMessage } from '@lib/utils/getErrorMessage'

import { primaryTradeAssetPriceProviderId } from '../../entities/Trade'
import { useTradesQuery } from '../queries/useTradesQuery'
import { isGoodPrice } from '../utils/isGoodPrice'

import { TradesChart } from './chart/TradesChart'
import { NextTrade } from './NextTrade'
import { TradeItem } from './TradeItem'

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
            {!tradesQuery.isLoading && <TradesChart trades={trades} />}
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
