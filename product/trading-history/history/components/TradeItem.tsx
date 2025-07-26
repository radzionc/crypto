import { TradeType } from '@lib/chain/types/TradeType'
import { Text, TextColor } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { ValueProp } from '@lib/utils/entities/props'
import { formatAmount } from '@lib/utils/formatAmount'
import { match } from '@lib/utils/match'
import { format } from 'date-fns'

import { Trade } from '../../entities/Trade'

import { TradeItemFrame } from './TradeItemFrame'

export const TradeItem = ({
  value: { asset, amount, price, type, timestamp, cashAsset },
}: ValueProp<Trade>) => {
  const color = match<TradeType, TextColor>(type, {
    buy: () => 'contrast',
    sell: () => 'primary',
  })

  const cashValue = amount * price

  return (
    <TradeItemFrame>
      <Text>{format(timestamp, 'dd MMM yyyy')}</Text>
      <Text color={color}>
        {capitalizeFirstLetter(type)} {amount.toFixed(2)} {asset} ~ $
        {formatAmount(cashValue)}
      </Text>
      <Text>
        1 {asset} ={' '}
        <Text as="span" color="contrast">
          {price.toFixed(2)}
        </Text>{' '}
        {cashAsset}
      </Text>
    </TradeItemFrame>
  )
}
