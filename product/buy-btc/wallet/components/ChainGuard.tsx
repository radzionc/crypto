import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useChainId, useSwitchChain } from 'wagmi'
import { useAsset } from '../../swap/state/asset'
import { Button } from '@lib/ui/buttons/Button'
import { getChain } from '../../chain/config'

export const ChainGuard = ({ children }: ComponentWithChildrenProps) => {
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const [asset] = useAsset()

  const isWrongChain = chainId !== asset.chainId

  if (isWrongChain) {
    return (
      <Button
        onClick={() => {
          switchChain({ chainId: asset.chainId })
        }}
      >
        Switch to {getChain(asset.chainId).name}
      </Button>
    )
  }

  return <>{children}</>
}
