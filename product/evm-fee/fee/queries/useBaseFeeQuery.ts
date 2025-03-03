import { useTransformQueryData } from '@lib/ui/query/hooks/useTransformQueryData'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { Block } from 'viem'
import { useBlock } from 'wagmi'

const transform = (data: Block): bigint => {
  return shouldBePresent(data.baseFeePerGas)
}

export const useBaseFeeQuery = () => {
  const query = useBlock({
    watch: true,
  })

  return useTransformQueryData(query, transform)
}
