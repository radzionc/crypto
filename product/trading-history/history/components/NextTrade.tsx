import { TradeType } from '@lib/chain/types/TradeType'
import { Text } from '@lib/ui/text'
import { ValueProp } from '@lib/utils/entities/props'
import { format } from 'date-fns'

import { cashAssets, tradeAssets } from '../../entities/Trade'

import { TradeItemFrame } from './TradeItemFrame'

type NextTradeProps = ValueProp<TradeType> & {
  isGoodPrice: boolean
  price: number
}

export const NextTrade = ({ value, isGoodPrice, price }: NextTradeProps) => {
  const [tradeAsset] = tradeAssets
  const [cashAsset] = cashAssets

  return (
    <TradeItemFrame>
      <Text>{format(Date.now(), 'dd MMM yyyy')}</Text>

      <Text>{`${isGoodPrice ? 'Good' : 'Bad'} price to ${value}`}</Text>
      <Text>
        1 {tradeAsset} ={' '}
        <Text as="span" color={isGoodPrice ? 'success' : 'alert'}>
          {price.toFixed(2)}
        </Text>{' '}
        {cashAsset}
      </Text>
    </TradeItemFrame>
  )
}
