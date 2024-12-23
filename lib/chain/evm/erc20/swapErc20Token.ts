import { createClientV2 } from '@0x/swap-ts-sdk'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import {
  Address,
  Chain,
  createPublicClient,
  createWalletClient,
  http,
} from 'viem'
import { polygon } from 'viem/chains'
import { TransferDirection } from '@lib/utils/TransferDirection'
import { assertField } from '@lib/utils/record/assertField'

type Input = Record<TransferDirection, Address> & {
  chain: Chain
  accountAddress: Address
  destinationAddress?: Address
  zeroXApiKey: string
  amount: bigint
}

export const swapErc20Token = async ({
  zeroXApiKey,
  accountAddress,
  chain,
  from,
  to,
  amount,
  destinationAddress,
}: Input) => {
  const client = createClientV2({
    apiKey: zeroXApiKey,
  })

  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  const walletClient = createWalletClient({
    account: accountAddress,
    chain: polygon,
    transport: http(),
  })

  const quote = await client.swap.permit2.getQuote.query({
    sellToken: from,
    buyToken: to,
    chainId: chain.id,
    sellAmount: amount,
    taker: destinationAddress ?? accountAddress,
  })

  const transaction = assertField(quote, 'transaction')

  const hash = await walletClient.sendTransaction({
    gas: BigInt(shouldBePresent(transaction.gas, 'gas')),
    value: BigInt(transaction.value),
    to: transaction.to as Address,
    gasPrice: BigInt(transaction.gasPrice),
    data: transaction.data as `0x${string}`,
  })

  await publicClient.waitForTransactionReceipt({
    hash,
  })

  return hash
}
