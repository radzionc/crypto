import { getMerkleRoot } from './core/getMerkleRoot'
import { queryUrl } from '../../lib/utils/query/queryUrl'
import { toBitcoinMerkleNode } from './core/toBitcoinMerkleNode'

interface BlockData {
  merkle_root: string
  height: number
}

const verifyMerkleRoot = async (blockHash: string) => {
  const blockData = await queryUrl<BlockData>(
    `https://blockstream.info/api/block/${blockHash}`,
  )
  const transactions = await queryUrl<string[]>(
    `https://blockstream.info/api/block/${blockHash}/txids`,
  )

  console.log(`Block Merkle Root from blockchain: ${blockData.merkle_root}`)
  console.log(`Number of transactions: ${transactions.length}`)

  const computedMerkleRoot = getMerkleRoot(transactions, toBitcoinMerkleNode)

  console.log(`Computed Merkle Root: ${computedMerkleRoot}`)
  const isValid = computedMerkleRoot === blockData.merkle_root

  console.log(`Merkle Root Validation: ${isValid ? 'Valid ✅' : 'Invalid ❌'}`)
}

const blockHash =
  '0000000000000000000266819fe415c51f9c025e1059b4c1332c1033236166f0'

verifyMerkleRoot(blockHash)
