import { Button } from '@lib/ui/buttons/Button'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { OnFinishProp } from '@lib/ui/props'

import { RegistrationStepContainer } from './RegistrationStepContainer'
import { RegistrationStepTitle } from './RegistrationStepTitle'

export const RegistrationFlowFailureState = ({ onFinish }: OnFinishProp) => {
  return (
    <RegistrationStepContainer
      as="form"
      {...getFormProps({ onSubmit: onFinish })}
    >
      <RegistrationStepTitle>Registration failed</RegistrationStepTitle>
      <Button kind="primary" type="submit">
        Try again
      </Button>
    </RegistrationStepContainer>
  )
}
