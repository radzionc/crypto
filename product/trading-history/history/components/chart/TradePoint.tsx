import { MinusIcon } from '@lib/ui/icons/MinusIcon'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import styled from 'styled-components'
import { matchColor } from '@lib/ui/theme/getters'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { round } from '@lib/ui/css/round'
import { Trade } from '../../../entities/Trade'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { TradeDetails } from './TradeDetails'
import { UiProps } from '@lib/ui/props'

type TradePointProps = UiProps & {
  value: Trade
}

const IconContainer = styled.div<{ type: 'buy' | 'sell' }>`
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;

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

export function TradePoint({ value, style, className }: TradePointProps) {
  const { type } = value

  return (
    <Tooltip
      content={<TradeDetails trade={value} />}
      renderOpener={(props) => (
        <IconContainer
          {...props}
          type={type}
          style={style}
          className={className}
        >
          {type === 'buy' ? <PlusIcon /> : <MinusIcon />}
        </IconContainer>
      )}
    />
  )
}
