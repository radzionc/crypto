import { Button } from '@lib/ui/buttons/Button'
import { ChildrenProp } from '@lib/ui/props'
import { useChainId, useSwitchChain } from 'wagmi'

import { getChain } from '../../swap/core/chains'
import { useSourceChainId } from '../../swap/state/sourceChainId'

export const ChainGuard = ({ children }: ChildrenProp) => {
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const [sourceChainId] = useSourceChainId()

  if (chainId !== sourceChainId) {
    return (
      <Button
        onClick={() => {
          switchChain({ chainId: sourceChainId })
        }}
      >
        Switch to {getChain(sourceChainId).name}
      </Button>
    )
  }

  return <>{children}</>
}
