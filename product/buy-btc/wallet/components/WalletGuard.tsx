import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ConnectWallet } from './ConnectWallet'
import { useAccount } from 'wagmi'

export const WalletGuard = ({ children }: ComponentWithChildrenProps) => {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return <ConnectWallet />
  }

  return <>{children}</>
}
