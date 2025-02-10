import { ChildrenProp } from '@lib/ui/props'
import { useAddresses } from '../state/addresses'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { Text } from '@lib/ui/text'

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
