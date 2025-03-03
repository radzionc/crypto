import { AmountTextInput } from '@lib/ui/inputs/AmountTextInput'

import { getChain } from '../core/chains'
import { useAmount } from '../state/amount'
import { useSourceChainId } from '../state/sourceChainId'

import { MaxAmount } from './MaxAmount'

export function ManageAmount() {
  const [amount, setAmount] = useAmount()
  const [sourceChainId] = useSourceChainId()
  const { nativeCurrency } = getChain(sourceChainId)

  return (
    <AmountTextInput
      value={amount}
      onValueChange={setAmount}
      shouldBePositive
      label={`${nativeCurrency.name} amount`}
      placeholder="Enter amount"
      suggestion={<MaxAmount />}
    />
  )
}
