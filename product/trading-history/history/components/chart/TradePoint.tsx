import { UIComponentProps } from '@lib/ui/props'
import { MinusIcon } from '@lib/ui/icons/MinusIcon'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import styled from 'styled-components'
import { matchColor } from '@lib/ui/theme/getters'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { round } from '@lib/ui/css/round'
import { Trade } from '../../../entities/Trade'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { format } from 'date-fns'
import { Text } from '@lib/ui/text'
import { hStack, VStack } from '@lib/ui/css/stack'
import { getColor } from '@lib/ui/theme/getters'

type TradePointProps = UIComponentProps & {
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

const TooltipContent = styled(VStack).attrs({ gap: 4 })`
  min-width: 200px;
`

const Field = styled.div`
  ${hStack({
    justifyContent: 'space-between',
    fullWidth: true,
    alignItems: 'center',
  })};

  > :first-child {
    color: ${getColor('textSupporting')};
  }
`

export function TradePoint({ value, style, className }: TradePointProps) {
  const { type, price, timestamp, amount, asset, cashAsset } = value

  const tooltipContent = (
    <TooltipContent>
      <Field>
        <Text>Type</Text>
        <Text>{type.toUpperCase()}</Text>
      </Field>
      <Field>
        <Text>Amount</Text>
        <Text>
          {amount.toFixed(2)} {asset}
        </Text>
      </Field>
      <Field>
        <Text>Price</Text>
        <Text>
          {price.toFixed(2)} {cashAsset}
        </Text>
      </Field>
      <Field>
        <Text>Date</Text>
        <Text>{format(timestamp, 'dd MMM yyyy')}</Text>
      </Field>
    </TooltipContent>
  )

  return (
    <Tooltip
      content={tooltipContent}
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
