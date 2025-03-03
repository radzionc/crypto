import { TextInput } from '@lib/ui/inputs/TextInput'
import { useEffect, useState } from 'react'
import { isAddress } from 'viem'

import { useAddresses } from '../state/addresses'

import { useAreAddressesVisible } from './state/areAddressesVisible'

export const AddAddress = () => {
  const [addresses, setAddresses] = useAddresses()

  const [inputValue, setInputValue] = useState('')

  const [isVisible] = useAreAddressesVisible()

  useEffect(() => {
    if (isAddress(inputValue) && !addresses.includes(inputValue)) {
      setInputValue('')
      setAddresses([...addresses, inputValue])
    }
  }, [addresses, inputValue, setAddresses])

  return (
    <TextInput
      value={inputValue}
      onValueChange={setInputValue}
      type={isVisible ? 'text' : 'password'}
      autoFocus
      placeholder="Add an address"
    />
  )
}
