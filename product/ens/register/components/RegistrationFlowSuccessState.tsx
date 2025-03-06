import { Button } from '@lib/ui/buttons/Button'
import { VStack } from '@lib/ui/css/stack'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { CheckCircleIcon } from '@lib/ui/icons/CheckCircleIcon'
import { OnFinishProp, ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'

import { tld } from '../config'

export const RegistrationFlowSuccessState = ({
  value,
  onFinish,
}: ValueProp<string> & OnFinishProp) => {
  return (
    <VStack
      as="form"
      {...getFormProps({ onSubmit: onFinish })}
      alignItems="center"
      gap={20}
      fullWidth
    >
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

      <Button kind="primary" size="l" type="submit">
        Back to Home
      </Button>
    </VStack>
  )
}
