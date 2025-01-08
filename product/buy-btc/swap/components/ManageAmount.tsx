import { AmountTextInput } from '@lib/ui/inputs/AmountTextInput'
import { useAmount } from '../state/amount'
import { MaxAmount } from './MaxAmount'
import { getChain } from '../core/chains'
import { useSourceChainId } from '../state/sourceChainId'

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
