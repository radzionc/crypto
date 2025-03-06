import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
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

const DEFAULT_RESOLVER = '0x0000000000000000000000000000000000000000'
const DEFAULT_DATA: `0x${string}`[] = []
const DEFAULT_REVERSE_RECORD = false
const DEFAULT_OWNER_CONTROLLED_FUSES = 0

const MIN_COMMITMENT_AGE = 60

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

      const isAvailable = await publicClient.readContract({
        address: contractAddress,
        abi: ethRegistrarControllerAbi as Abi,
        functionName: 'available',
        args: [name],
      })

      if (!isAvailable) {
        throw new Error(`Name ${name} is not available`)
      }

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
          DEFAULT_RESOLVER,
          DEFAULT_DATA,
          DEFAULT_REVERSE_RECORD,
          DEFAULT_OWNER_CONTROLLED_FUSES,
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

      const startTime = Date.now()
      const endTime = startTime + MIN_COMMITMENT_AGE * 1000

      await new Promise((resolve) => {
        const interval = setInterval(() => {
          const now = Date.now()

          if (now >= endTime) {
            clearInterval(interval)
            resolve(true)
          }
        }, 1000)
      })
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
          DEFAULT_RESOLVER,
          DEFAULT_DATA,
          DEFAULT_REVERSE_RECORD,
          DEFAULT_OWNER_CONTROLLED_FUSES,
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
