import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { WagmiProvider, http } from 'wagmi'
import React from 'react'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { productName } from '../../product/config'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { chains } from '../../swap/core/chains'

const config = getDefaultConfig({
  appName: productName,
  projectId: shouldBePresent(process.env.NEXT_PUBLIC_REOWN_PROJECT_ID),
  chains,
  transports: recordFromKeys(
    chains.map((chain) => chain.id),
    () => http(),
  ),
})

export const WalletProvider = ({ children }: ComponentWithChildrenProps) => {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiProvider>
  )
}
