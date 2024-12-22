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
  zeroXApiKey: string
  amount: bigint
}

export const swapErc20Tokens = async ({
  zeroXApiKey,
  accountAddress,
  chain,
  from,
  to,
  amount,
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
    taker: accountAddress,
  })

  const transaction = assertField(quote, 'transaction')

  const txHash = await walletClient.sendTransaction({
    gas: BigInt(shouldBePresent(transaction.gas, 'gas')),
    value: BigInt(transaction.value),
    to: transaction.to as Address,
    gasPrice: BigInt(transaction.gasPrice),
    data: transaction.data as `0x${string}`,
  })

  const { transactionHash } = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  })

  return transactionHash
}
