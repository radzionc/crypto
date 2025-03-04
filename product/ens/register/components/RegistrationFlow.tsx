import { useState } from 'react'

import { RegistrationForm } from './RegistrationForm'
import { RegistrationSuccess } from './RegistrationSuccess'

export const RegistrationFlow = () => {
  const [registeredName, setRegisteredName] = useState<string | undefined>(
    undefined,
  )

  if (registeredName) {
    return (
      <RegistrationSuccess
        value={registeredName}
        onBack={() => setRegisteredName(undefined)}
      />
    )
  }

  return <RegistrationForm onFinish={setRegisteredName} />
}
