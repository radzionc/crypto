import { AmountTextInput } from '@lib/ui/inputs/AmountTextInput'
import { useAmount } from '../state/amount'
import { MaxAmount } from './MaxAmount'

export function ManageAmount() {
  const [amount, setAmount] = useAmount()

  return (
    <AmountTextInput
      value={amount}
      onValueChange={setAmount}
      shouldBePositive
      label="Amount"
      placeholder="Enter amount"
      suggestion={<MaxAmount />}
    />
  )
}
