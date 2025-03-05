import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useSwitchChain } from 'wagmi'

import { chains } from '../..'

type RenderParams = {
  submitText: string
  onSubmit: () => void
}

type WalletDependantFormProps = RenderParams & {
  render: (params: RenderParams) => React.ReactNode
}

export const WalletDependantForm = ({
  render,
  submitText,
  onSubmit,
}: WalletDependantFormProps) => {
  const { isConnected, chainId } = useAccount()

  const { switchChain } = useSwitchChain()

  if (!isConnected) {
    return (
      <ConnectButton.Custom>
        {({ openConnectModal }) =>
          render({
            submitText: 'Connect Wallet',
            onSubmit: openConnectModal,
          })
        }
      </ConnectButton.Custom>
    )
  }

  const isSupportedChain = chains.some((chain) => chain.id === chainId)

  if (!isSupportedChain) {
    return render({
      submitText: 'Switch Network',
      onSubmit: () => switchChain({ chainId: chains[0].id }),
    })
  }

  return render({ submitText, onSubmit })
}
