import { Button } from '@lib/ui/buttons/Button'
import { VStack, vStack } from '@lib/ui/css/stack'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { InputDebounce } from '@lib/ui/inputs/InputDebounce'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { Center } from '@lib/ui/layout/Center'
import { OnFinishProp } from '@lib/ui/props'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { useState } from 'react'
import styled from 'styled-components'

import { WalletDependantForm } from '../../chain/wallet/components/WalletDependantForm'
import { tld } from '../config'
import { useRegisterNameMutation } from '../mutations/useRegisterNameMutation'
import { useIsNameAvailableQuery } from '../queries/useIsNameAvailableQuery'

const Content = styled.div`
  ${vStack({
    gap: 20,
    fullWidth: true,
  })}

  max-width: 320px;
`

const Status = styled.div`
  min-height: 20px;
  ${vStack({
    alignItems: 'center',
  })}
`

export const RegistrationForm = ({ onFinish }: OnFinishProp<string>) => {
  const [name, setName] = useState('')

  const isNameAvailableQuery = useIsNameAvailableQuery(name)

  const registerNameMutation = useRegisterNameMutation({
    onSuccess: onFinish,
  })

  const isNameAvailable = !!isNameAvailableQuery.data
  const isFormPending = registerNameMutation.isPending

  return (
    <Center>
      <WalletDependantForm
        submitText="Register"
        onSubmit={({ walletClient }) =>
          registerNameMutation.mutate({
            name,
            walletClient,
          })
        }
        render={({ submitText, onSubmit }) => (
          <Content
            as="form"
            {...getFormProps({
              isPending: isFormPending,
              isDisabled: !isNameAvailable,
              onSubmit,
            })}
          >
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
            {isNameAvailable && (
              <Button isLoading={isFormPending} type="submit">
                {submitText}
              </Button>
            )}
          </Content>
        )}
      />
    </Center>
  )
}
