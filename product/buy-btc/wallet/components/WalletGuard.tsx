import { ChildrenProp } from '@lib/ui/props'
import { useAccount } from 'wagmi'

import { ConnectWallet } from './ConnectWallet'

export const WalletGuard = ({ children }: ChildrenProp) => {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return <ConnectWallet />
  }

  return <>{children}</>
}
