import { Button } from '@lib/ui/buttons/Button'
import { VStack } from '@lib/ui/css/stack'
import { CheckCircleIcon } from '@lib/ui/icons/CheckCircleIcon'
import { OnBackProp, ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'

import { tld } from '../config'

export const RegistrationSuccess = ({
  value,
  onBack,
}: ValueProp<string> & OnBackProp) => {
  return (
    <VStack alignItems="center" gap={20} fullWidth>
      <Text color="success" size={40}>
        <CheckCircleIcon />
      </Text>

      <Text size={24}>Congratulations!</Text>
      <Text>
        You have successfully registered{' '}
        <strong>
          {value}.{tld}
        </strong>
      </Text>

      <Button kind="primary" size="l" onClick={onBack}>
        Back to Home
      </Button>
    </VStack>
  )
}
