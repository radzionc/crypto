import { Button } from '@lib/ui/buttons/Button'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { CheckCircleIcon } from '@lib/ui/icons/CheckCircleIcon'
import { OnFinishProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { ValueProp } from '@lib/utils/entities/props'

import { tld } from '../config'

import { RegistrationStepContainer } from './RegistrationStepContainer'
import { RegistrationStepTitle } from './RegistrationStepTitle'

export const RegistrationFlowSuccessState = ({
  value,
  onFinish,
}: ValueProp<string> & OnFinishProp) => {
  return (
    <RegistrationStepContainer
      as="form"
      {...getFormProps({ onSubmit: onFinish })}
      alignItems="center"
    >
      <Text color="success" size={40}>
        <CheckCircleIcon />
      </Text>

      <RegistrationStepTitle>Congratulations!</RegistrationStepTitle>
      <Text centerHorizontally color="contrast">
        You have successfully registered{' '}
        <strong>
          {value}.{tld}
        </strong>
      </Text>

      <Button type="submit">Back to Home</Button>
    </RegistrationStepContainer>
  )
}
