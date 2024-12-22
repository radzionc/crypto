import { createClientV2 } from '@0x/swap-ts-sdk'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import {
  Chain,
  Address,
  createPublicClient,
  createWalletClient,
  http,
} from 'viem'
import { polygon } from 'viem/chains'
import { getErc20Balance } from './getErc20Balance'
import { TransferDirection } from '@lib/utils/TransferDirection'
import { assertField } from '@lib/utils/record/assertField'

type Input = Record<TransferDirection, string> & {
  chain: Chain
  accountAddress: Address
  zeroXApiKey: string
}

export const swapErc20Tokens = async ({
  zeroXApiKey,
  accountAddress,
  chain,
  from,
  to,
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

  const sellAmount = await getErc20Balance({
    chain: polygon,
    address: accountAddress,
  })

  const quote = await client.swap.permit2.getQuote.query({
    sellToken: from,
    buyToken: to,
    chainId: chain.id,
    sellAmount,
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
