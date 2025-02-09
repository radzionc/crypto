import { FeeSection } from '../FeeSection'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { Text } from '@lib/ui/text'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { gwei } from '@lib/chain/evm/utils/gwei'
import { formatAmount } from '@lib/utils/formatAmount'
import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'
import { useBaseFeeQuery } from '../queries/useBaseFeeQuery'

export const BaseFee = () => {
  const query = useBaseFeeQuery()

  return (
    <FeeSection
      title={
        <MatchQuery
          value={query}
          success={(value) => (
            <>
              baseFee
              <Text as="span" color="supporting">
                {' = '}
                {formatAmount(fromChainAmount(value, gwei.decimals))}{' '}
                {gwei.name}
              </Text>
            </>
          )}
        />
      }
    >
      <ShyInfoBlock>
        <Text color="supporting">
          The base fee is automatically determined by the network based on the
          demand for block space. When network activity increases, the base fee
          goes up to discourage congestion. When activity decreases, the base
          fee goes down to encourage network usage. This mechanism helps keep
          transaction fees at a reasonable level while ensuring network
          stability.
        </Text>
      </ShyInfoBlock>
    </FeeSection>
  )
}
