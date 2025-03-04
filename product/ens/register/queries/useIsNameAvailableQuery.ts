import { type Abi } from 'viem'
import { useReadContract } from 'wagmi'
import { useAccount } from 'wagmi'

import { ChainId } from '../../chain'
import {
  ethRegistrarControllerAbi,
  ethRegistrarControllerAddresses,
} from '../contracts/ethRegistrarConroller'

export const useIsNameAvailableQuery = (name: string) => {
  const { chainId } = useAccount()

  // Remove any dots from the name to ensure only the label is used
  const sanitizedName = name.replace(/\./g, '')

  return useReadContract({
    address: ethRegistrarControllerAddresses[chainId as ChainId],
    abi: ethRegistrarControllerAbi as Abi,
    functionName: 'available',
    args: [sanitizedName],
    query: {
      enabled: !!sanitizedName,
    },
  })
}
