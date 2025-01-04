import { UIComponentProps } from '@lib/ui/props'
import { MinusIcon } from '@lib/ui/icons/MinusIcon'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import styled from 'styled-components'
import { TradeType } from '@lib/chain/types/TradeType'
import { matchColor } from '@lib/ui/theme/getters'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { round } from '@lib/ui/css/round'

type TradePointProps = UIComponentProps & {
  type: TradeType
}

const IconContainer = styled.div<{ type: 'buy' | 'sell' }>`
  ${centerContent};
  ${sameDimensions(20)};
  font-size: 12px;
  ${round};
  background: ${matchColor('type', {
    buy: 'background',
    sell: 'primary',
  })};
  color: ${matchColor('type', {
    buy: 'contrast',
    sell: 'contrast',
  })};
  border: 1px solid;
`

export function TradePoint({ type, style, className }: TradePointProps) {
  return (
    <IconContainer type={type} style={style} className={className}>
      {type === 'buy' ? <PlusIcon /> : <MinusIcon />}
    </IconContainer>
  )
}
