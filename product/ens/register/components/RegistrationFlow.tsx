import { Flow } from '@lib/ui/base/Flow'
import { useState } from 'react'
import { UseWalletClientReturnType } from 'wagmi/dist/types/hooks/useWalletClient'

import { RegistrationFlowExecutionStep } from './RegistrationFlowExecutionStep'
import { RegistrationFlowNameStep } from './RegistrationFlowNameStep'

type RegistrationFlowStep =
  | {
      id: 'name'
      name: string
    }
  | {
      id: 'execution'
      name: string
      walletClient: NonNullable<UseWalletClientReturnType['data']>
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
            onFinish={({ name, walletClient }) =>
              setStep({ id: 'execution', name, walletClient })
            }
          />
        ),
        execution: ({ name, walletClient }) => (
          <RegistrationFlowExecutionStep
            onBack={() => setStep({ id: 'name', name })}
            onFinish={() => setStep({ id: 'name', name: '' })}
            name={name}
            walletClient={walletClient}
          />
        ),
      }}
    />
  )
}
