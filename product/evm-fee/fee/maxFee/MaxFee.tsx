import { VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { formatAmount } from '@lib/utils/formatAmount'
import { FeeSection } from '../FeeSection'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { useEstimateGas } from 'wagmi'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { useAssetPriceQuery } from '@lib/chain-ui/queries/useAssetPriceQuery'
import { toChainAmount } from '@lib/chain/utils/toChainAmount'
import { mainnet } from 'viem/chains'
import { useBaseFeeQuery } from '../queries/useBaseFeeQuery'
import { useTransformQueriesData } from '@lib/ui/query/hooks/useTransformQueriesData'
import { usePriorityFeeQuery } from '../queries/usePriorityFeeQuery'
import { baseFeeMultiplier } from '../baseFee/config'
import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'

export const MaxFee = () => {
  const baseFeeQuery = useBaseFeeQuery()
  const priorityFeeQuery = usePriorityFeeQuery()

  const gasQuery = useEstimateGas({
    account: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    value: toChainAmount(1, mainnet.nativeCurrency.decimals),
  })

  const priceQuery = useAssetPriceQuery({ id: 'ethereum' })

  const maxFeeQuery = useTransformQueriesData(
    {
      baseFee: baseFeeQuery,
      priorityFee: priorityFeeQuery,
      gas: gasQuery,
    },
    ({ baseFee, priorityFee, gas }) =>
      fromChainAmount(
        Number(baseFee) * baseFeeMultiplier + Number(priorityFee) * Number(gas),
        mainnet.nativeCurrency.decimals,
      ),
  )

  return (
    <VStack gap={60}>
      <MatchQuery
        value={maxFeeQuery}
        success={(maxFee) => {
          return (
            <Text
              color="contrast"
              height="l"
              as="h1"
              size={28}
              style={{ textTransform: 'uppercase' }}
            >
              Estimated maximum fee to send 1 ETH:{' '}
              <Text as="span" color="primary">
                {formatAmount(maxFee)} ETH{' '}
                <MatchQuery
                  value={priceQuery}
                  success={(price) => {
                    return <>≈ ${formatAmount(price * maxFee)}</>
                  }}
                />
              </Text>
            </Text>
          )
        }}
      />
      <FeeSection title="maxFee = maxFeePerGas × gasLimit">
        <ShyInfoBlock>
          <Text color="supporting">
            This is the maximum amount you might pay in transaction fees. The
            actual cost is usually lower because you'll get refunded for: 1) any
            unused gas from your gasLimit, and 2) the difference between your
            maxFeePerGas and the actual base fee. The maxFeePerGas includes both
            the base fee (with a {((1.125 - 1) * 100).toFixed(1)}% buffer for
            potential increases) and a priority fee that incentivizes validators
            to include your transaction.
          </Text>
        </ShyInfoBlock>
      </FeeSection>
    </VStack>
  )
}
