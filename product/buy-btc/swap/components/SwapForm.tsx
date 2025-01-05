import { VStack } from '@lib/ui/css/stack'
import { ManageChain } from './ManageChain'
import { useAssetsQuery } from '../queries/useAssetsQuery'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { getErrorMessage } from '@lib/utils/getErrorMessage'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'
import { useChainId } from '../state/chainId'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { AssetsProvider } from '../state/assets'
import { AssetProvider } from '../state/asset'
import { ManageAsset } from './ManageAsset'
import { AssetBalance } from './AssetBalance'

export const SwapForm = () => {
  const assetsQuery = useAssetsQuery()
  const [chainId] = useChainId()

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
        success={(assets) => {
          const chainAssets = assets.filter(
            (asset) => asset.chainId === chainId,
          )

          if (isEmpty(chainAssets)) {
            return (
              <ShyInfoBlock>
                <Text>
                  No assets found for this chain, try switching to a different
                  network
                </Text>
              </ShyInfoBlock>
            )
          }

          return (
            <AssetsProvider value={chainAssets}>
              <AssetProvider>
                <VStack gap={12}>
                  <ManageAsset />
                  <AssetBalance />
                </VStack>
              </AssetProvider>
            </AssetsProvider>
          )
        }}
      />
    </VStack>
  )
}
