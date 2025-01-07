import { AmountTextInput } from '@lib/ui/inputs/AmountTextInput'
import { useAmount } from '../state/amount'
import { MaxAmount } from './MaxAmount'
import { getChain } from '../../chain/config'
import { TokenIcon } from '@web3icons/react'
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
      unit={<TokenIcon symbol={nativeCurrency.symbol} />}
    />
  )
}
