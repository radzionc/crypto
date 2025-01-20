import { toPairs } from '@lib/utils/array/toPairs'
import { getLastItem } from '@lib/utils/array/getLastItem'

type GetMerkleProofInput = {
  nodes: string[]
  targetNode: string
  toNode: (pair: [string, string]) => string
}

export const getMerkleProof = ({
  nodes,
  targetNode,
  toNode,
}: GetMerkleProofInput): string[] => {
  if (nodes.length === 0) {
    throw new Error('Cannot create a Merkle proof with no leaves')
  }

  if (nodes.length === 1) {
    return []
  }

  const pairs = toPairs(
    nodes.length % 2 === 0 ? nodes : [...nodes, getLastItem(nodes)],
  )

  const targetIndex = nodes.indexOf(targetNode)
  if (targetIndex === -1) {
    throw new Error('Target node not found in the tree')
  }

  const pairIndex = Math.floor(targetIndex / 2)

  const pair = pairs[pairIndex]

  const isLeftNode = targetIndex % 2 === 0
  const proofNode = pair[isLeftNode ? 1 : 0]

  const level = pairs.map(toNode)

  const nextTargetNode = toNode(pair)

  return [
    proofNode,
    ...getMerkleProof({ nodes: level, targetNode: nextTargetNode, toNode }),
  ]
}
