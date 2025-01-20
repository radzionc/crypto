type VerifyMerkleProofInput = {
  leaf: string
  merkleRoot: string
  proof: string[]
  toNode: (pair: [string, string]) => string
  index: number
}

export const verifyMerkleProof = ({
  leaf,
  merkleRoot,
  proof,
  toNode,
  index,
}: VerifyMerkleProofInput): boolean => {
  let currentNode = leaf
  let currentIndex = index

  proof.forEach((proofNode) => {
    const isLeftNode = currentIndex % 2 === 0
    const pair: [string, string] = isLeftNode
      ? [currentNode, proofNode]
      : [proofNode, currentNode]

    currentNode = toNode(pair)
    currentIndex = Math.floor(currentIndex / 2)
  })

  return currentNode === merkleRoot
}
