import { Button } from '@lib/ui/buttons/Button'
import { VStack } from '@lib/ui/css/stack'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { InputDebounce } from '@lib/ui/inputs/InputDebounce'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { Center } from '@lib/ui/layout/Center'
import { OnFinishProp } from '@lib/ui/props'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { addYears, differenceInSeconds } from 'date-fns'
import { useState } from 'react'

import { WalletDependantForm } from '../../chain/wallet/components/WalletDependantForm'
import { tld } from '../config'
import { RegisterNameMutationInput } from '../mutations/useRegisterNameMutation'
import { useIsNameAvailableQuery } from '../queries/useIsNameAvailableQuery'
import { useRegistrationDuration } from '../state/registrationDuration'

import { ManageRegistrationDuration } from './ManageRegistrationDuration'
import { RegistrationStepContainer } from './RegistrationStepContainer'
import { RegistrationStepTitle } from './RegistrationStepTitle'

export const RegistrationFlowNameStep = ({
  onFinish,
}: OnFinishProp<RegisterNameMutationInput>) => {
  const [name, setName] = useState('')

  const isNameAvailableQuery = useIsNameAvailableQuery(name)

  const [duration] = useRegistrationDuration()

  return (
    <Center>
      <WalletDependantForm
        submitText="Register"
        onSubmit={({ walletClient }) => {
          const now = new Date()
          onFinish({
            name,
            walletClient,
            duration: differenceInSeconds(addYears(now, duration), now),
          })
        }}
        render={({ submitText, onSubmit }) => (
          <RegistrationStepContainer
            as="form"
            {...getFormProps({
              isDisabled: !isNameAvailableQuery.data,
              onSubmit,
            })}
          >
            <RegistrationStepTitle>Your web3 username</RegistrationStepTitle>
            <VStack gap={8}>
              <InputDebounce<string>
                value={name}
                onChange={setName}
                render={({ value, onChange }) => (
                  <TextInput
                    value={value}
                    onValueChange={(newValue) =>
                      onChange(newValue.replace(/\./g, ''))
                    }
                    autoFocus
                    placeholder={`Search for a .${tld} name`}
                  />
                )}
              />
              {name && (
                <MatchQuery
                  value={isNameAvailableQuery}
                  pending={() => 'Checking availability...'}
                  success={(isAvailable) => {
                    const fullName = `${name}.${tld}`

                    return (
                      <Text color={isAvailable ? 'success' : 'alert'}>
                        {isAvailable
                          ? `${fullName} is available!`
                          : `${fullName} is already taken.`}
                      </Text>
                    )
                  }}
                  error={() => 'Error checking availability.'}
                />
              )}
            </VStack>
            <ManageRegistrationDuration />
            {isNameAvailableQuery.data && (
              <Button type="submit">{submitText}</Button>
            )}
          </RegistrationStepContainer>
        )}
      />
    </Center>
  )
}
