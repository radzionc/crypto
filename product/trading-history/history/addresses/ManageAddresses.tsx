import { panel } from '@lib/ui/css/panel'
import { HStack, VStack, vStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'

import { useAddresses } from '../state/addresses'

import { AddAddress } from './AddAddress'
import { ManageAddress } from './ManageAddress'
import { ManageAddressesVisibility } from './ManageAddressesVisibility'

const Container = styled.div`
  ${panel()};
  flex: 1;
  min-width: 360px;
  ${vStack({
    gap: 12,
  })}
  align-self: flex-start;
`

export const ManageAddresses = () => {
  const [value] = useAddresses()

  return (
    <Container>
      <HStack fullWidth alignItems="center" justifyContent="space-between">
        <Text color="contrast" size={18} weight={600}>
          Track Addresses
        </Text>
        <ManageAddressesVisibility />
      </HStack>
      <VStack gap={4}>
        {value.map((address) => (
          <ManageAddress key={address} value={address} />
        ))}
      </VStack>
      <AddAddress />
    </Container>
  )
}
