import { toPairs } from '@lib/utils/array/toPairs'
import { getLastItem } from '@lib/utils/array/getLastItem'

export const getMerkleRoot = (
  nodes: string[],
  toNode: (pair: [string, string]) => string,
): string => {
  if (nodes.length === 0) {
    throw new Error('Cannot create a Merkle tree with no leaves')
  }

  if (nodes.length === 1) {
    return nodes[0]
  }

  const pairs = toPairs(
    nodes.length % 2 === 0 ? nodes : [...nodes, getLastItem(nodes)],
  )

  const level = pairs.map(toNode)

  return getMerkleRoot(level, toNode)
}
