import { Button } from '@lib/ui/buttons/Button'
import { VStack } from '@lib/ui/css/stack'
import { Center } from '@lib/ui/layout/Center'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { ProductLogo } from '../../product/ProductLogo'

export const ConnectWallet = () => {
  return (
    <Center>
      <VStack alignItems="center" gap={20}>
        <ProductLogo />
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <Button onClick={openConnectModal} size="l" kind="primary">
              Connect Wallet
            </Button>
          )}
        </ConnectButton.Custom>
      </VStack>
    </Center>
  )
}
