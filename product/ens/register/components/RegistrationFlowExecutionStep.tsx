import { OnBackProp, OnFinishProp } from '@lib/ui/props'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { useEffect } from 'react'
import { UseWalletClientReturnType } from 'wagmi/dist/types/hooks/useWalletClient'

import { useRegisterNameMutation } from '../mutations/useRegisterNameMutation'

import { RegistrationFlowFailureState } from './RegistrationFlowFailureState'
import { RegistrationFlowSuccessState } from './RegistrationFlowSuccessState'

type RegistrationFlowExecutionStepProps = OnBackProp &
  OnFinishProp & {
    name: string
    walletClient: NonNullable<UseWalletClientReturnType['data']>
  }

export const RegistrationFlowExecutionStep = ({
  onBack,
  onFinish,
  name,
  walletClient,
}: RegistrationFlowExecutionStepProps) => {
  const { mutate: register, ...mutationState } = useRegisterNameMutation()

  useEffect(() => {
    register({
      name,
      walletClient,
    })
  }, [name, walletClient, register])

  return (
    <MatchQuery
      value={mutationState}
      success={() => (
        <RegistrationFlowSuccessState value={name} onFinish={onFinish} />
      )}
      error={() => <RegistrationFlowFailureState onFinish={onBack} />}
    />
  )
}
