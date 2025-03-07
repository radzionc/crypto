import { type Abi } from 'viem'
import { useReadContract } from 'wagmi'

import { ChainId } from '../../chain'
import { useChainId } from '../../chain/hooks/useChainId'
import {
  ethRegistrarControllerAbi,
  ethRegistrarControllerAddresses,
} from '../contracts/ethRegistrarConroller'

export const useIsNameAvailableQuery = (name: string) => {
  const chainId = useChainId()

  return useReadContract({
    address: ethRegistrarControllerAddresses[chainId as ChainId],
    abi: ethRegistrarControllerAbi as Abi,
    functionName: 'available',
    args: [name],
    query: {
      enabled: !!name,
    },
  })
}
