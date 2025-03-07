import { Button } from '@lib/ui/buttons/Button'
import { ProgressList } from '@lib/ui/progress/list/ProgressList'
import { OnBackProp, OnFinishProp } from '@lib/ui/props'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { useEffect } from 'react'

import {
  useRegisterNameMutation,
  nameRegistrationSteps,
  nameRegistrationStepText,
} from '../mutations/useRegisterNameMutation'
import { NameRegistrationParams } from '../NameRegistrationParams'

import { RegistrationFlowFailureState } from './RegistrationFlowFailureState'
import { RegistrationFlowSuccessState } from './RegistrationFlowSuccessState'
import { RegistrationStepContainer } from './RegistrationStepContainer'
import { RegistrationStepTitle } from './RegistrationStepTitle'

type RegistrationFlowExecutionStepProps = OnBackProp &
  OnFinishProp & {
    params: NameRegistrationParams
  }

export const RegistrationFlowExecutionStep = ({
  onBack,
  onFinish,
  params,
}: RegistrationFlowExecutionStepProps) => {
  const { mutate: register, step, ...mutationState } = useRegisterNameMutation()

  useEffect(() => {
    register(params)
  }, [params, register])

  return (
    <MatchQuery
      value={mutationState}
      success={() => (
        <RegistrationFlowSuccessState value={params.name} onFinish={onFinish} />
      )}
      pending={() => (
        <RegistrationStepContainer alignItems="center">
          <RegistrationStepTitle>
            Registering {params.name}.eth
          </RegistrationStepTitle>
          <Text centerHorizontally>
            Please wait while we process your registration. This may take a few
            minutes.
          </Text>
          {step && (
            <ProgressList
              items={nameRegistrationSteps}
              value={step}
              renderItem={(item) => nameRegistrationStepText[item]}
            />
          )}
          <Button kind="secondary" onClick={onBack}>
            Cancel
          </Button>
        </RegistrationStepContainer>
      )}
      error={() => <RegistrationFlowFailureState onFinish={onBack} />}
    />
  )
}
