import { VStack } from '@lib/ui/css/stack'
import { ManageChain } from './ManageChain'
import { useAssetsQuery } from '../queries/useAssetsQuery'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { getErrorMessage } from '@lib/utils/getErrorMessage'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'

export const SwapForm = () => {
  const assetsQuery = useAssetsQuery()

  return (
    <VStack gap={20}>
      <ManageChain />
      <MatchQuery
        value={assetsQuery}
        pending={() => <Text color="supporting">Loading assets...</Text>}
        error={(error) => (
          <ShyWarningBlock title="Failed to load assets">
            {getErrorMessage(error)}
          </ShyWarningBlock>
        )}
        success={(assets) => (
          <code>
            <pre>{JSON.stringify(assets, null, 2)}</pre>
          </code>
        )}
      />
    </VStack>
  )
}
