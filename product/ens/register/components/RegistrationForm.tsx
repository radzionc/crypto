import { Button } from '@lib/ui/buttons/Button'
import { vStack } from '@lib/ui/css/stack'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { InputDebounce } from '@lib/ui/inputs/InputDebounce'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { Center } from '@lib/ui/layout/Center'
import { OnFinishProp } from '@lib/ui/props'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { useState } from 'react'
import styled from 'styled-components'
import { useWalletClient } from 'wagmi'

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

  const isFormDisabled = !isNameAvailableQuery.data
  const isFormPending = registerNameMutation.isPending

  const walletClientQuery = useWalletClient()

  return (
    <Center>
      <MatchQuery
        value={walletClientQuery}
        pending={() => 'Loading wallet client...'}
        success={(walletClient) => (
          <WalletDependantForm
            submitText="Register"
            onSubmit={() =>
              registerNameMutation.mutate({
                name,
                walletClient,
              })
            }
            render={({ submitText, onSubmit }) => (
              <Content
                as="form"
                {...getFormProps({
                  isPending: registerNameMutation.isPending,
                  isDisabled: isFormDisabled,
                  onSubmit,
                })}
              >
                <InputDebounce
                  value={name}
                  onChange={setName}
                  render={({ value, onChange }) => (
                    <TextInput
                      value={value}
                      onValueChange={(newValue) =>
                        onChange(newValue.replace(/\./g, ''))
                      }
                      autoFocus
                      label={`.${tld} name`}
                      placeholder="Search for a name"
                    />
                  )}
                />
                <Status>
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
                </Status>
                <Button
                  isDisabled={isFormDisabled}
                  isLoading={isFormPending}
                  type="submit"
                >
                  {submitText}
                </Button>

                <Status>
                  {name && (
                    <MatchQuery
                      value={registerNameMutation}
                      pending={() => null}
                      error={() => 'Error registering name.'}
                    />
                  )}
                </Status>
              </Content>
            )}
          />
        )}
      />
    </Center>
  )
}
