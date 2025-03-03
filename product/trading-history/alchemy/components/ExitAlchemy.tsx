import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { LogOutIcon } from '@lib/ui/icons/LogOutIcon'

import { useAlchemyApiKey } from '../state/alchemyApiKey'

export const ExitAlchemy = () => {
  const [, setValue] = useAlchemyApiKey()

  return (
    <Button kind="secondary" onClick={() => setValue(null)}>
      <HStack alignItems="center" gap={8}>
        <LogOutIcon />
        Exit
      </HStack>
    </Button>
  )
}
