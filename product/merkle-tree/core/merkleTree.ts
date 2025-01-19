import { sha256 } from '@lib/chain/crypto/sha256'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { toPairs } from '@lib/utils/array/toPairs'

const createLevel = (nodes: string[]): string[] => {
  const pairs = toPairs(
    nodes.length % 2 === 0 ? nodes : [...nodes, getLastItem(nodes)],
  )

  return pairs.map((pair) => sha256(pair.join('')))
}

export const getMerkleRoot = (leaves: string[]): string => {
  if (leaves.length === 0) {
    throw new Error('Cannot create a Merkle tree with no leaves')
  }

  const hashedLeaves = leaves.map(sha256)

  const buildTree = (nodes: string[]): string => {
    if (nodes.length === 1) {
      return nodes[0]
    }
    return buildTree(createLevel(nodes))
  }

  return buildTree(hashedLeaves)
}
