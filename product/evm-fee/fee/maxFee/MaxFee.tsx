import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'
import { toChainAmount } from '@lib/chain/utils/toChainAmount'
import { useAssetPriceQuery } from '@lib/chain-ui/queries/useAssetPriceQuery'
import { Spinner } from '@lib/ui/loaders/Spinner'
import { MatchQuery } from '@lib/ui/query/components/MatchQuery'
import { useTransformQueriesData } from '@lib/ui/query/hooks/useTransformQueriesData'
import { Text } from '@lib/ui/text'
import { formatAmount } from '@lib/utils/formatAmount'
import { mainnet } from 'viem/chains'
import { useEstimateGas } from 'wagmi'

import { baseFeeMultiplier } from '../baseFee/config'
import { useBaseFeeQuery } from '../queries/useBaseFeeQuery'
import { usePriorityFeeQuery } from '../queries/usePriorityFeeQuery'

const ethAmount = 1

export const MaxFee = () => {
  const baseFeeQuery = useBaseFeeQuery()
  const priorityFeeQuery = usePriorityFeeQuery()

  const gasQuery = useEstimateGas({
    account: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    to: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    value: toChainAmount(ethAmount, mainnet.nativeCurrency.decimals),
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
        (BigInt(Math.round(Number(baseFee) * baseFeeMultiplier)) +
          priorityFee) *
          gas,
        mainnet.nativeCurrency.decimals,
      ),
  )

  return (
    <Text
      color="contrast"
      height="l"
      as="h1"
      size={28}
      style={{ textTransform: 'uppercase' }}
    >
      Estimated max fee to send {ethAmount} ETH:{' '}
      <MatchQuery
        value={maxFeeQuery}
        pending={() => <Spinner />}
        success={(maxFee) => {
          return (
            <>
              <Text as="span" color="primary">
                {formatAmount(maxFee)} ETH{' '}
                <MatchQuery
                  value={priceQuery}
                  success={(price) => {
                    return <>≈ ${formatAmount(price * maxFee)}</>
                  }}
                />
              </Text>
            </>
          )
        }}
      />
    </Text>
  )
}
