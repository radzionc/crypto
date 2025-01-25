import { getPublicClient } from '@lib/chain/evm/utils/getPublicClient'
import { mainnet } from 'viem/chains'
import { getMptRoot } from './core/getMptRoot'

const test = async () => {
  // Using a specific block for testing
  const blockHash =
    '0xd36af501402d8b50b8a77ac68e4a24548cece9de58ba2d2877ab1f201e5da94f'

  const publicClient = getPublicClient(mainnet)

  // Get block data from the network
  const block = await publicClient.getBlock({
    blockHash,
    includeTransactions: true,
  })

  console.log('Block transactions:', block.transactions.length)
  console.log('Actual transactionsRoot:', block.transactionsRoot)

  // Calculate MPT root
  const calculatedRoot = await getMptRoot(block.transactions)
  console.log('Calculated transactionsRoot:', calculatedRoot)
  console.log('Root matches:', calculatedRoot === block.transactionsRoot)
}

test()
