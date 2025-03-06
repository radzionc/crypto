import { OnBackProp, OnFinishProp } from '@lib/ui/props'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { useEffect } from 'react'

import {
  RegisterNameMutationInput,
  useRegisterNameMutation,
} from '../mutations/useRegisterNameMutation'

import { RegistrationFlowFailureState } from './RegistrationFlowFailureState'
import { RegistrationFlowSuccessState } from './RegistrationFlowSuccessState'

type RegistrationFlowExecutionStepProps = OnBackProp &
  OnFinishProp &
  RegisterNameMutationInput

export const RegistrationFlowExecutionStep = ({
  onBack,
  onFinish,
  ...registerNameInput
}: RegistrationFlowExecutionStepProps) => {
  const { mutate: register, ...mutationState } = useRegisterNameMutation()

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
      pending={() => <p>Todo</p>}
      error={() => <RegistrationFlowFailureState onFinish={onBack} />}
    />
  )
}
