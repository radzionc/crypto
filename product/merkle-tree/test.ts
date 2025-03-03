import { queryUrl } from '../../lib/utils/query/queryUrl'

import { getMerkleProof } from './core/getMerkleProof'
import { getMerkleRoot } from './core/getMerkleRoot'
import { toBitcoinMerkleNode } from './core/toBitcoinMerkleNode'
import { verifyMerkleProof } from './core/verifyMerkleProof'

interface BlockData {
  merkle_root: string
  height: number
}

const verifyBlock = async (blockHash: string) => {
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
  const isRootValid = computedMerkleRoot === blockData.merkle_root
  console.log(
    `Merkle Root Validation: ${isRootValid ? 'Valid ✅' : 'Invalid ❌'}`,
  )

  // Pick a random transaction to verify
  const randomIndex = Math.floor(Math.random() * transactions.length)
  const targetTx = transactions[randomIndex]
  console.log(`\nVerifying random transaction:`)
  console.log(`Transaction Hash: ${targetTx}`)
  console.log(`Transaction Index: ${randomIndex}`)

  const proof = getMerkleProof({
    nodes: transactions,
    targetNode: targetTx,
    toNode: toBitcoinMerkleNode,
  })

  const isProofValid = verifyMerkleProof({
    leaf: targetTx,
    merkleRoot: blockData.merkle_root,
    proof,
    toNode: toBitcoinMerkleNode,
    index: randomIndex,
  })

  console.log(`Proof length: ${proof.length} elements`)
  console.log(
    `Transaction Proof Validation: ${isProofValid ? 'Valid ✅' : 'Invalid ❌'}`,
  )
}

const blockHash =
  '0000000000000000000266819fe415c51f9c025e1059b4c1332c1033236166f0'

verifyBlock(blockHash)
