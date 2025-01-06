import { useAmount } from '../state/amount'
import { useAsset } from '../state/asset'
import { useBalance } from 'wagmi'
import { useAccount } from 'wagmi'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { formatUnits } from 'viem'
import styled from 'styled-components'
import { text } from '@lib/ui/text'
import { interactive } from '@lib/ui/css/interactive'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'

const Container = styled(UnstyledButton)`
  ${text({ color: 'primary' })}
  ${interactive}
`

export function MaxAmount() {
  const [, setAmount] = useAmount()
  const account = useAccount()
  const [asset] = useAsset()

  const address = shouldBePresent(account.address)
  const balanceQuery = useBalance({
    address,
    token: asset.address as `0x${string}` | undefined,
    chainId: asset.chainId,
  })

  return (
    <MatchQuery
      value={balanceQuery}
      pending={() => null}
      error={() => null}
      success={({ value, decimals }) => (
        <Container
          onClick={() => {
            const maxAmount = Number(formatUnits(value, decimals))
            setAmount(maxAmount)
          }}
        >
          Max: {formatUnits(value, decimals)} {asset.symbol}
        </Container>
      )}
    />
  )
}
