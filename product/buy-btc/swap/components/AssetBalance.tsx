import { text } from '@lib/ui/text'
import { useAsset } from '../state/asset'
import { formatUnits } from 'viem'
import { useBalance } from 'wagmi'
import { useAccount } from 'wagmi'
import styled from 'styled-components'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Spinner } from '@lib/ui/loaders/Spinner'

const Container = styled.p`
  align-self: flex-end;
  ${text({
    color: 'contrast',
    centerVertically: {
      gap: 4,
    },
  })}
`

export const AssetBalance = () => {
  const account = useAccount()
  const [asset] = useAsset()

  const address = shouldBePresent(account.address)

  const balanceQuery = useBalance({
    address,
    token: asset.address as `0x${string}` | undefined,
    chainId: asset.chainId,
  })

  console.log('balance query: ', balanceQuery)

  return (
    <Container>
      <span>Balance:</span>
      <MatchQuery
        value={balanceQuery}
        pending={() => <Spinner />}
        error={() => <span>Failed to load</span>}
        success={({ value, decimals }) => {
          return (
            <span>
              {formatUnits(value, decimals)} {asset.symbol}
            </span>
          )
        }}
      />
    </Container>
  )
}
