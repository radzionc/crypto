import { useSendTransaction } from 'wagmi'
import { Button } from '@lib/ui/buttons/Button'
import { useAmount } from '../state/amount'
import { toChainAmount } from '@lib/chain/utils/toChainAmount'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useSourceChainId } from '../state/sourceChainId'
import { getChain } from '../core/chains'
import { ShyWarningBlock } from '@lib/ui/status/ShyWarningBlock'
import { getErrorMessage } from '@lib/utils/getErrorMessage'
import { VStack } from '@lib/ui/css/stack'
import { text, Text } from '@lib/ui/text'
import styled from 'styled-components'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'

type ExecuteSwapProps = {
  memo: string
  receiver: `0x${string}`
}

const Link = styled(ExternalLink)`
  ${text({ color: 'primary', weight: 'bold' })}
`

export const ExecuteSwap = ({ memo, receiver }: ExecuteSwapProps) => {
  const [sourceChainId] = useSourceChainId()
  const [amount] = usePresentState(useAmount())
  const { sendTransaction, isPending, error, data } = useSendTransaction()
  const { nativeCurrency } = getChain(sourceChainId)

  return (
    <>
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
      {error && (
        <ShyWarningBlock title="Failed to execute swap">
          {getErrorMessage(error)}
        </ShyWarningBlock>
      )}
      {data && (
        <VStack>
          <Text>
            Transaction sent,{' '}
            <Link to={`https://thorchain.net/tx/${data}`}>track it here</Link>
          </Text>
        </VStack>
      )}
    </>
  )
}
