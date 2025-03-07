import { IsDisabledProp } from '@lib/ui/props'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
  useAccount,
  useSwitchChain,
  useWalletClient,
  UseWalletClientReturnType,
} from 'wagmi'

import { chains } from '../..'

type SubmitParams = {
  walletClient: NonNullable<UseWalletClientReturnType['data']>
}

type RenderParams = IsDisabledProp & {
  submitText: string
  onSubmit: () => void
}

type WalletDependantFormProps = IsDisabledProp & {
  submitText: string
  onSubmit: (params: SubmitParams) => void
  render: (params: RenderParams) => React.ReactNode
}

export const WalletDependantForm = ({
  render,
  submitText,
  onSubmit,
  isDisabled,
}: WalletDependantFormProps) => {
  const { isConnected, chainId } = useAccount()

  const { switchChain } = useSwitchChain()

  const walletClientQuery = useWalletClient()

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
      isDisabled: true,
      submitText: 'Switch Network',
      onSubmit: () => switchChain({ chainId: chains[0].id }),
    })
  }

  return (
    <MatchQuery
      value={walletClientQuery}
      success={(walletClient) =>
        render({
          submitText,
          isDisabled,
          onSubmit: () => onSubmit({ walletClient }),
        })
      }
    />
  )
}
