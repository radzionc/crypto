import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { WagmiProvider, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import React from 'react'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { productName } from '../../product/config'

const config = getDefaultConfig({
  appName: productName,
  projectId: shouldBePresent(process.env.NEXT_PUBLIC_REOWN_PROJECT_ID),
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

export const WalletProvider = ({ children }: ComponentWithChildrenProps) => {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiProvider>
  )
}
