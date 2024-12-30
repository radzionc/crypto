import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import {
  cashAssets,
  primaryTradeAssetPriceProviderId,
  Trade,
  tradeAssets,
} from '../../entities/Trade'
import { useAssetPriceQuery } from '@lib/chain-ui/queries/useAssetPriceQuery'
import { TradeItemFrame } from './TradeItemFrame'
import { Text } from '@lib/ui/text'
import { match } from '@lib/utils/match'
import { format } from 'date-fns'

type NextTradeProps = {
  lastTrade: Pick<Trade, 'price' | 'type'>
}

export const NextTrade = ({ lastTrade }: NextTradeProps) => {
  const priceQuery = useAssetPriceQuery({
    id: primaryTradeAssetPriceProviderId,
  })

  const [tradeAsset] = tradeAssets
  const [cashAsset] = cashAssets

  return (
    <TradeItemFrame>
      <Text>{format(Date.now(), 'dd MMM yyyy')}</Text>

      <MatchQuery
        value={priceQuery}
        error={() => <Text>Failed to load price</Text>}
        pending={() => <Text>Loading price...</Text>}
        success={(price) => {
          const isGoodPrice = match(lastTrade.type, {
            buy: () => price < lastTrade.price,
            sell: () => price > lastTrade.price,
          })

          const nextTrade = lastTrade.type === 'buy' ? 'sell' : 'buy'

          return (
            <>
              <Text>{`${isGoodPrice ? 'Good' : 'Bad'} price to ${nextTrade}`}</Text>
              <Text>
                1 {tradeAsset} ={' '}
                <Text as="span" color={isGoodPrice ? 'success' : 'alert'}>
                  {price.toFixed(2)}
                </Text>{' '}
                {cashAsset}
              </Text>
            </>
          )
        }}
      />
    </TradeItemFrame>
  )
}
