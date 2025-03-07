import { ChildrenProp } from '@lib/ui/props'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import React from 'react'
import { WagmiProvider, http } from 'wagmi'

import { chains } from '../..'
import { productName } from '../../../product/config'

const config = getDefaultConfig({
  appName: productName,
  projectId: shouldBePresent(process.env.NEXT_PUBLIC_REOWN_PROJECT_ID),
  chains,
  transports: recordFromKeys(
    chains.map((chain) => chain.id),
    () => http(),
  ),
})

export const WalletProvider = ({ children }: ChildrenProp) => {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiProvider>
  )
}
