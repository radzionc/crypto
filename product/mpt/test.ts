import { getPublicClient } from '@lib/chain/evm/utils/getPublicClient'
import { mainnet } from 'viem/chains'

const test = async () => {
  const blockHash =
    '0xae9ec9d357bc8db5ddb2fb83c6c67a5654db027b6b356c44e058211b70fe5684'

  const publicClient = getPublicClient(mainnet)

  const { transactions, transactionsRoot } = await publicClient.getBlock({
    blockHash,
  })

  console.log(transactions)
  console.log(transactionsRoot)
}

test()
