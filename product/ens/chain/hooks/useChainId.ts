import { isOneOf } from '@lib/utils/array/isOneOf'
import { useAccount } from 'wagmi'

import { ChainId, chainIds } from '..'

export const useChainId = (): ChainId => {
  const { chainId } = useAccount()

  if (isOneOf(chainId, chainIds)) {
    return chainId
  }

  return chainIds[0]
}
