import { VStack } from '@lib/ui/css/stack'
import { hStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { format } from 'date-fns'
import styled from 'styled-components'

import { Trade } from '../../../entities/Trade'

const Field = styled.div`
  ${hStack({
    justifyContent: 'space-between',
    fullWidth: true,
    alignItems: 'center',
    gap: 20,
  })};

  min-width: 200px;

  > :first-child {
    color: ${getColor('textSupporting')};
  }
`

type TradeDetailsProps = {
  trade: Trade
}

export function TradeDetails({ trade }: TradeDetailsProps) {
  const { type, price, timestamp, amount, asset, cashAsset } = trade

  return (
    <VStack gap={4}>
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
    </VStack>
  )
}
