import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useMutation } from '@tanstack/react-query'
import { type Abi } from 'viem'
import { useAccount, usePublicClient, UseWalletClientReturnType } from 'wagmi'

import { ChainId, getChain } from '../../chain'
import { useChainId } from '../../chain/hooks/useChainId'
import {
  ethRegistrarControllerAbi,
  ethRegistrarControllerAddresses,
} from '../contracts/ethRegistrarConroller'
import { useRegistrationPersistence } from '../state/useRegistrationPersistence'
import { generateSecureRandomHex } from '../utils/generateSecureRandomHex'

const REGISTRATION_DURATION = 31536000

const DEFAULT_RESOLVER = '0x0000000000000000000000000000000000000000'
const DEFAULT_DATA: `0x${string}`[] = []
const DEFAULT_REVERSE_RECORD = false
const DEFAULT_OWNER_CONTROLLED_FUSES = 0

const MIN_COMMITMENT_AGE = 60

type RegisterNameMutationInput = {
  name: string
  walletClient: NonNullable<UseWalletClientReturnType['data']>
}

export const useRegisterNameMutation = ({
  onSuccess,
}: {
  onSuccess: (name: string) => void
}) => {
  const chainId = useChainId()
  const { address } = useAccount()
  const publicClient = shouldBePresent(usePublicClient())

  const {
    saveCommitment,
    clearCommitment,
    getStoredCommitment,
    hasValidStoredCommitment,
  } = useRegistrationPersistence()

  return useMutation({
    mutationFn: async ({ name, walletClient }: RegisterNameMutationInput) => {
      if (!address) {
        throw new Error('No wallet connected')
      }

      const contractAddress =
        ethRegistrarControllerAddresses[chainId as ChainId]

      const existingCommitment = getStoredCommitment(name)
      const hasValidCommitment = hasValidStoredCommitment(name)

      if (hasValidCommitment && existingCommitment) {
        const rentPriceResult = (await publicClient.readContract({
          address: contractAddress,
          abi: ethRegistrarControllerAbi as Abi,
          functionName: 'rentPrice',
          args: [name, REGISTRATION_DURATION],
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
            REGISTRATION_DURATION,
            existingCommitment.secret,
            DEFAULT_RESOLVER,
            DEFAULT_DATA,
            DEFAULT_REVERSE_RECORD,
            DEFAULT_OWNER_CONTROLLED_FUSES,
          ],
          value: totalPrice,
          account: address,
          chain: getChain(chainId),
        })

        await publicClient.waitForTransactionReceipt({ hash: registerHash })
        clearCommitment(name)
        return name
      }

      const isAvailable = await publicClient.readContract({
        address: contractAddress,
        abi: ethRegistrarControllerAbi as Abi,
        functionName: 'available',
        args: [name],
      })

      if (!isAvailable) {
        throw new Error(`Name ${name} is not available`)
      }

      // Step 2: Generate new commitment
      const secret = generateSecureRandomHex(32) as `0x${string}`

      const commitmentHash = (await publicClient.readContract({
        address: contractAddress,
        abi: ethRegistrarControllerAbi as Abi,
        functionName: 'makeCommitment',
        args: [
          name,
          address,
          REGISTRATION_DURATION,
          secret,
          DEFAULT_RESOLVER,
          DEFAULT_DATA,
          DEFAULT_REVERSE_RECORD,
          DEFAULT_OWNER_CONTROLLED_FUSES,
        ],
      })) as `0x${string}`

      // Step 3: Submit commitment transaction
      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi: ethRegistrarControllerAbi as Abi,
        functionName: 'commit',
        args: [commitmentHash],
        chain: getChain(chainId),
        account: address,
      })

      await publicClient.waitForTransactionReceipt({ hash })

      // Save commitment data to persistence store
      saveCommitment({
        name,
        secret,
        commitmentHash,
        timestamp: Date.now(),
        address,
      })
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
        args: [name, REGISTRATION_DURATION],
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
          REGISTRATION_DURATION,
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

      // Clear the commitment data
      clearCommitment(name)
      return name
    },
    onSuccess,
  })
}
