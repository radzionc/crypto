import { VStack } from '@lib/ui/css/stack'
import { ProgressList } from '@lib/ui/progress/list/ProgressList'
import { OnBackProp, OnFinishProp } from '@lib/ui/props'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { useEffect } from 'react'

import {
  RegisterNameMutationInput,
  useRegisterNameMutation,
  nameRegistrationSteps,
  nameRegistrationStepText,
} from '../mutations/useRegisterNameMutation'

import { RegistrationFlowFailureState } from './RegistrationFlowFailureState'
import { RegistrationFlowSuccessState } from './RegistrationFlowSuccessState'
import { RegistrationStepContainer } from './RegistrationStepContainer'
import { RegistrationStepTitle } from './RegistrationStepTitle'

type RegistrationFlowExecutionStepProps = OnBackProp &
  OnFinishProp &
  RegisterNameMutationInput

export const RegistrationFlowExecutionStep = ({
  onBack,
  onFinish,
  ...registerNameInput
}: RegistrationFlowExecutionStepProps) => {
  const { mutate: register, step, ...mutationState } = useRegisterNameMutation()

  useEffect(() => {
    register(registerNameInput)
  }, [registerNameInput, register])

  return (
    <MatchQuery
      value={mutationState}
      success={() => (
        <RegistrationFlowSuccessState
          value={registerNameInput.name}
          onFinish={onFinish}
        />
      )}
      pending={() => (
        <RegistrationStepContainer>
          <VStack alignItems="center" gap={8}>
            <RegistrationStepTitle>
              Registering {registerNameInput.name}.eth
            </RegistrationStepTitle>
            <Text color="supporting">
              Please wait while we process your registration. This may take a
              few minutes.
            </Text>
          </VStack>
          {step && (
            <ProgressList
              items={nameRegistrationSteps}
              value={step}
              renderItem={(item) => nameRegistrationStepText[item]}
            />
          )}
        </RegistrationStepContainer>
      )}
      error={() => <RegistrationFlowFailureState onFinish={onBack} />}
    />
  )
}
