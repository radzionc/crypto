import { centerContent } from '@lib/ui/css/centerContent'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { MinusIcon } from '@lib/ui/icons/MinusIcon'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { UiProps } from '@lib/ui/props'
import { matchColor } from '@lib/ui/theme/getters'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import styled from 'styled-components'

import { Trade } from '../../../entities/Trade'

import { TradeDetails } from './TradeDetails'

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
