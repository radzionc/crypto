import { ComponentWithValueProps } from '@lib/ui/props'
import { Text, TextColor } from '@lib/ui/text'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { Trade } from '../../entities/Trade'
import { format } from 'date-fns'
import { match } from '@lib/utils/match'
import { TradeItemFrame } from './TradeItemFrame'
import { TradeType } from '@lib/chain/types/TradeType'

export const TradeItem = ({
  value: { asset, amount, price, type, timestamp, cashAsset },
}: ComponentWithValueProps<Trade>) => {
  const color = match<TradeType, TextColor>(type, {
    buy: () => 'contrast',
    sell: () => 'primary',
  })

  return (
    <TradeItemFrame>
      <Text>{format(timestamp, 'dd MMM yyyy')}</Text>
      <Text color={color}>
        {capitalizeFirstLetter(type)} {amount.toFixed(2)} {asset}
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
