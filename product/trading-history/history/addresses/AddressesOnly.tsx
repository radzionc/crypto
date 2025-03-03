import { ChildrenProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { isEmpty } from '@lib/utils/array/isEmpty'

import { useAddresses } from '../state/addresses'

export const AddressesOnly = ({ children }: ChildrenProp) => {
  const [addresses] = useAddresses()

  if (isEmpty(addresses)) {
    return (
      <Text color="contrast" size={18}>
        Add an address to continue 👉
      </Text>
    )
  }

  return <>{children}</>
}
