import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useAddresses } from '../state/addresses'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { Text } from '@lib/ui/text'

export const AddressesOnly = ({ children }: ComponentWithChildrenProps) => {
  const [addresses] = useAddresses()

  if (isEmpty(addresses)) {
    return <Text>Add an address to continue</Text>
  }

  return <>{children}</>
}
