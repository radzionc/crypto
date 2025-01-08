import { ComponentWithValueProps } from '@lib/ui/props'
import { QuoteResponse } from '../core/getQuote'
import { Text } from '@lib/ui/text'
import { btc } from '../core/btc'
import { formatAmount } from '@lib/utils/formatAmount'
import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'

export const SwapInfo = ({ value }: ComponentWithValueProps<QuoteResponse>) => {
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
