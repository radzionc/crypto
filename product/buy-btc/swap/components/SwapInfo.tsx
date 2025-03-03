import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'
import { ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { formatAmount } from '@lib/utils/formatAmount'

import { btc } from '../core/btc'
import { QuoteResponse } from '../core/getQuote'

export const SwapInfo = ({ value }: ValueProp<QuoteResponse>) => {
  return (
    <Text>
      You should receive ~{' '}
      <Text as="span" color="primary">
        {formatAmount(fromChainAmount(value.expected_amount_out, btc.decimals))}{' '}
        {btc.symbol}
      </Text>
    </Text>
  )
}
