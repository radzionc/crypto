import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { WagmiProvider, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import React from 'react'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

const config = getDefaultConfig({
  appName: 'Buy Bitcoin',
  projectId: shouldBePresent(process.env.REOWN_PROJECT_ID),
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
