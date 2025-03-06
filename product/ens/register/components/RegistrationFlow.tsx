import { Flow } from '@lib/ui/base/Flow'
import { useState } from 'react'

import { RegisterNameMutationInput } from '../mutations/useRegisterNameMutation'

import { RegistrationFlowExecutionStep } from './RegistrationFlowExecutionStep'
import { RegistrationFlowNameStep } from './RegistrationFlowNameStep'

type RegistrationFlowStep =
  | {
      id: 'name'
      name: string
    }
  | ({
      id: 'execution'
    } & RegisterNameMutationInput)

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
            onFinish={(registerNameInput) =>
              setStep({ id: 'execution', ...registerNameInput })
            }
          />
        ),
        execution: (registerNameInput) => (
          <RegistrationFlowExecutionStep
            onBack={() => setStep({ id: 'name', name: '' })}
            onFinish={() => setStep({ id: 'name', name: '' })}
            {...registerNameInput}
          />
        ),
      }}
    />
  )
}
