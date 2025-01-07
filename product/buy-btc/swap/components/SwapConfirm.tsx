import { useQuoteQuery } from '../queries/useQuoteQuery'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/Text'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'
import { getErrorMessage } from '@lib/utils/getErrorMessage'

export const SwapConfirm = () => {
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
      success={(quote) => <code>{JSON.stringify(quote, null, 2)}</code>}
    />
  )
}
