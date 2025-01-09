import { useAmount } from '../state/amount'
import { useBalance } from 'wagmi'
import { useAccount } from 'wagmi'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { formatUnits } from 'viem'
import styled from 'styled-components'
import { text } from '@lib/ui/text'
import { interactive } from '@lib/ui/css/interactive'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { useSourceChainId } from '../state/sourceChainId'
import { getChain } from '../core/chains'

const Container = styled(UnstyledButton)`
  ${text({ color: 'primary' })}
  ${interactive}
`

export function MaxAmount() {
  const [, setAmount] = useAmount()
  const account = useAccount()
  const [sourceChainId] = useSourceChainId()

  const address = shouldBePresent(account.address)
  const balanceQuery = useBalance({
    address,
    chainId: sourceChainId,
  })
  const { nativeCurrency } = getChain(sourceChainId)

  return (
    <MatchQuery
      value={balanceQuery}
      success={({ value, decimals }) => {
        const amount = Number(formatUnits(value, decimals))
        return (
          <Container
            onClick={() => {
              setAmount(amount)
            }}
          >
            Max: {amount.toFixed(2)} {nativeCurrency.symbol}
          </Container>
        )
      }}
    />
  )
}
