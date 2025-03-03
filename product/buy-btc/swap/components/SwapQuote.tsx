import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'
import { Text } from '@lib/ui/Text'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getErrorMessage } from '@lib/utils/getErrorMessage'

import { ChainGuard } from '../../wallet/components/ChainGuard'
import { useQuoteQuery } from '../queries/useQuoteQuery'

import { ExecuteSwap } from './ExecuteSwap'
import { SwapInfo } from './SwapInfo'

export const SwapQuote = () => {
  const quoteQuery = useQuoteQuery()

  return (
    <MatchQuery
      value={quoteQuery}
      pending={() => <Text color="supporting">Loading quote...</Text>}
      error={(err) => (
        <ShyWarningBlock title="Quote error">
          {getErrorMessage(err)}
        </ShyWarningBlock>
      )}
      success={(quote) => (
        <>
          <SwapInfo value={quote} />
          <ChainGuard>
            <ExecuteSwap
              memo={quote.memo}
              receiver={shouldBePresent(quote.inbound_address) as `0x${string}`}
            />
          </ChainGuard>
        </>
      )}
    />
  )
}
