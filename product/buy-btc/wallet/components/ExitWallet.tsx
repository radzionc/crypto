import { HStack } from '@lib/ui/css/stack'
import { Button } from '@lib/ui/buttons/Button'
import { LogOutIcon } from '@lib/ui/icons/LogOutIcon'
import { useDisconnect } from 'wagmi'

export const ExitWallet = () => {
  const { disconnect } = useDisconnect()

  return (
    <Button kind="secondary" onClick={() => disconnect()}>
      <HStack alignItems="center" gap={8}>
        <LogOutIcon />
        Exit
      </HStack>
    </Button>
  )
}
