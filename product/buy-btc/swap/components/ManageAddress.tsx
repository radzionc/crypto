import { TextInput } from '@lib/ui/inputs/TextInput'
import { useAddress } from '../state/address'

export function ManageAddress() {
  const [address, setAddress] = useAddress()

  return (
    <TextInput
      label="Bitcoin Address"
      placeholder="Enter Bitcoin address"
      value={address}
      onValueChange={setAddress}
    />
  )
}
