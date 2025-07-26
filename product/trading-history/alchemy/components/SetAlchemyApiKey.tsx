import { vStack } from '@lib/ui/css/stack'
import { InputDebounce } from '@lib/ui/inputs/InputDebounce'
import { TextInput } from '@lib/ui/inputs/TextInput'
import { Center } from '@lib/ui/layout/Center'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { getErrorMessage } from '@lib/utils/getErrorMessage'
import { useMutation } from '@tanstack/react-query'
import { Alchemy, Network } from 'alchemy-sdk'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ProductLogo } from '../../product/ProductLogo'
import { useAlchemyApiKey } from '../state/alchemyApiKey'
import { isWrongAlchemyApiKey } from '../utils/isWrongAlchemyApiKey'

const Content = styled.div`
  ${vStack({
    gap: 20,
    alignItems: 'center',
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

export const SetAlchemyApiKey = () => {
  const [, setValue] = useAlchemyApiKey()

  const { mutate, ...mutationState } = useMutation({
    mutationFn: async (apiKey: string) => {
      const alchemy = new Alchemy({
        apiKey,
        network: Network.ETH_MAINNET,
      })

      await alchemy.core.getBlockNumber()

      return apiKey
    },
    onSuccess: setValue,
  })

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (inputValue) {
      mutate(inputValue)
    }
  }, [inputValue, mutate])

  return (
    <Center>
      <Content>
        <ProductLogo />
        <InputDebounce
          value={inputValue}
          onChange={setInputValue}
          render={({ value, onChange }) => (
            <TextInput
              value={value as string}
              onValueChange={onChange}
              autoFocus
              placeholder="Enter your Alchemy API key to continue"
            />
          )}
        />
        <Status>
          <MatchQuery
            value={mutationState}
            error={(error) => (
              <Text color="alert">
                {isWrongAlchemyApiKey(error)
                  ? 'Wrong API Key'
                  : getErrorMessage(error)}
              </Text>
            )}
            pending={() => <Text>Loading...</Text>}
          />
        </Status>
      </Content>
    </Center>
  )
}
