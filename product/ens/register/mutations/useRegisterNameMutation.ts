import { placeholderEvmAddress } from '@lib/chain/evm/utils/address'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { sleep } from '@lib/utils/sleep'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Years } from '@lib/utils/time/types'
import { useMutation } from '@tanstack/react-query'
import { addYears, differenceInSeconds } from 'date-fns'
import { type Abi } from 'viem'
import { useAccount, usePublicClient, UseWalletClientReturnType } from 'wagmi'

import { ChainId, getChain } from '../../chain'
import { useChainId } from '../../chain/hooks/useChainId'
import {
  ethRegistrarControllerAbi,
  ethRegistrarControllerAddresses,
} from '../contracts/ethRegistrarConroller'
import { generateSecureRandomHex } from '../utils/generateSecureRandomHex'

const data: `0x${string}`[] = []
const reverseRecord = false
const ownerControlledFuses = 0

export type RegisterNameMutationInput = {
  name: string
  walletClient: NonNullable<UseWalletClientReturnType['data']>
  duration: Years
}

export const useRegisterNameMutation = () => {
  const chainId = useChainId()
  const { address } = useAccount()
  const publicClient = shouldBePresent(usePublicClient())

  return useMutation({
    mutationFn: async ({
      name,
      walletClient,
      duration,
    }: RegisterNameMutationInput) => {
      const contractAddress =
        ethRegistrarControllerAddresses[chainId as ChainId]

      const now = new Date()
      const registrationDuration = differenceInSeconds(
        addYears(now, duration),
        now,
      )

      const secret = generateSecureRandomHex(32) as `0x${string}`

      const commitmentHash = (await publicClient.readContract({
        address: contractAddress,
        abi: ethRegistrarControllerAbi as Abi,
        functionName: 'makeCommitment',
        args: [
          name,
          address,
          registrationDuration,
          secret,
          placeholderEvmAddress,
          data,
          reverseRecord,
          ownerControlledFuses,
        ],
      })) as `0x${string}`

      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi: ethRegistrarControllerAbi as Abi,
        functionName: 'commit',
        args: [commitmentHash],
        chain: getChain(chainId),
        account: address,
      })

      await publicClient.waitForTransactionReceipt({ hash })

      await sleep(convertDuration(1, 'min', 'ms'))

      const rentPriceResult = (await publicClient.readContract({
        address: contractAddress,
        abi: ethRegistrarControllerAbi as Abi,
        functionName: 'rentPrice',
        args: [name, registrationDuration],
      })) as { base: bigint; premium: bigint }

      const totalPrice =
        ((rentPriceResult.base + rentPriceResult.premium) * BigInt(110)) /
        BigInt(100)

      const registerHash = await walletClient.writeContract({
        address: contractAddress,
        abi: ethRegistrarControllerAbi as Abi,
        functionName: 'register',
        args: [
          name,
          address,
          registrationDuration,
          secret,
          placeholderEvmAddress,
          data,
          reverseRecord,
          ownerControlledFuses,
        ],
        value: totalPrice,
        chain: getChain(chainId),
        account: address,
      })

      await publicClient.waitForTransactionReceipt({ hash: registerHash })

      return name
    },
  })
}
