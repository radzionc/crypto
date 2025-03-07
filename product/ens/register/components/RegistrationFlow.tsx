import { Flow } from '@lib/ui/base/Flow'
import { useState } from 'react'

import { NameRegistrationParams } from '../mutations/useRegisterNameMutation'

import { RegistrationFlowExecutionStep } from './RegistrationFlowExecutionStep'
import { RegistrationFlowNameStep } from './RegistrationFlowNameStep'

type RegistrationFlowStep =
  | {
      id: 'name'
      name: string
    }
  | {
      id: 'execution'
      params: NameRegistrationParams
    }

export const RegistrationFlow = () => {
  const [step, setStep] = useState<RegistrationFlowStep>({
    id: 'name',
    name: '',
  })

  return (
    <Flow
      step={step}
      steps={{
        name: () => (
          <RegistrationFlowNameStep
            onFinish={(params) => setStep({ id: 'execution', params })}
          />
        ),
        execution: ({ params }) => (
          <RegistrationFlowExecutionStep
            onBack={() => setStep({ id: 'name', name: '' })}
            onFinish={() => setStep({ id: 'name', name: '' })}
            params={params}
          />
        ),
      }}
    />
  )
}
