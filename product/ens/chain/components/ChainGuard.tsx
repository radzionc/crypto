import { Button } from '@lib/ui/buttons/Button'
import { VStack } from '@lib/ui/css/stack'
import { Center } from '@lib/ui/layout/Center'
import { ChildrenProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { useAccount, useSwitchChain } from 'wagmi'

import { chains } from '..'

export const ChainGuard = ({ children }: ChildrenProp) => {
  const { switchChain } = useSwitchChain()
  const account = useAccount()

  const isSupportedChain = chains.some((chain) => chain.id === account.chainId)

  if (!isSupportedChain) {
    return (
      <Center>
        <VStack gap={20} style={{ maxWidth: 360 }} title="Unsupported network">
          <VStack alignItems="center" gap={8}>
            <Text color="contrast" size={18} weight={600}>
              Unsupported network
            </Text>
            <Text color="supporting">
              Please switch to one of our supported networks.
            </Text>
          </VStack>
          <VStack fullWidth gap={8}>
            {chains.map((chain) => (
              <Button
                key={chain.id}
                kind="outlined"
                onClick={() => switchChain({ chainId: chain.id })}
              >
                Switch to {chain.name}
              </Button>
            ))}
          </VStack>
        </VStack>
      </Center>
    )
  }

  return <>{children}</>
}
