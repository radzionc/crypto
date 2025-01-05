import { ConnectButton } from '@rainbow-me/rainbowkit'
import { VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'

export const ConnectWallet = () => {
  return (
    <VStack alignItems="center" gap={16}>
      <Text>Connect your wallet to start trading</Text>
      <ConnectButton />
    </VStack>
  )
}
