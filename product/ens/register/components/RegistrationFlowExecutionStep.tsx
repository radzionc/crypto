import { MultiStepProgressList } from '@lib/ui/progress/MultiStepProgressList'
import { OnBackProp, OnFinishProp } from '@lib/ui/props'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { useEffect } from 'react'
import styled from 'styled-components'

import {
  RegisterNameMutationInput,
  useRegisterNameMutation,
  nameRegistrationSteps,
  nameRegistrationStepText,
  NameRegistrationStep,
} from '../mutations/useRegisterNameMutation'

import { RegistrationFlowFailureState } from './RegistrationFlowFailureState'
import { RegistrationFlowSuccessState } from './RegistrationFlowSuccessState'

type RegistrationFlowExecutionStepProps = OnBackProp &
  OnFinishProp &
  RegisterNameMutationInput

const PendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  text-align: center;
`

const Description = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin: 0;
`

export const RegistrationFlowExecutionStep = ({
  onBack,
  onFinish,
  ...registerNameInput
}: RegistrationFlowExecutionStepProps) => {
  const { mutate: register, step, ...mutationState } = useRegisterNameMutation()

  useEffect(() => {
    register(registerNameInput)
  }, [registerNameInput, register])

  // Function to get the text for a step
  const getStepText = (stepId: NameRegistrationStep) =>
    nameRegistrationStepText[stepId]

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
        <PendingContainer>
          <Title>Registering {registerNameInput.name}.eth</Title>
          <Description>
            Please wait while we process your registration. This may take a few
            minutes.
          </Description>
          {step && (
            <MultiStepProgressList
              steps={nameRegistrationSteps}
              currentStep={step}
              getStepText={getStepText}
            />
          )}
        </PendingContainer>
      )}
      error={() => <RegistrationFlowFailureState onFinish={onBack} />}
    />
  )
}
