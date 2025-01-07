import { useSendTransaction } from 'wagmi'
import { Button } from '@lib/ui/buttons/Button'
import { useAmount } from '../state/amount'
import { toChainAmount } from '@lib/chain/utils/toChainAmount'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useSourceChainId } from '../state/sourceChainId'
import { getChain } from '../../chain/config'

type ExecuteSwapProps = {
  memo: string
  receiver: `0x${string}`
}

export const ExecuteSwap = ({ memo, receiver }: ExecuteSwapProps) => {
  const [sourceChainId] = useSourceChainId()
  const [amount] = usePresentState(useAmount())
  const { sendTransaction, isPending } = useSendTransaction()
  const { nativeCurrency } = getChain(sourceChainId)

  return (
    <Button
      kind="primary"
      onClick={() => {
        sendTransaction({
          to: receiver as `0x${string}`,
          value: toChainAmount(amount, nativeCurrency.decimals),
          data: `0x${Buffer.from(memo).toString('hex')}`,
        })
      }}
      isLoading={isPending}
    >
      Buy Bitcoin
    </Button>
  )
}
