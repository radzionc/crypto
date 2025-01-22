import { getBlockHash } from './getBlockHash'
import { checkDifficulty } from './checkDifficulty'

type MineBlockInput = {
  version: number
  previousBlockHash: string
  merkleRoot: string
  timestamp: number
  bits: number
  startNonce: number
}

type MineBlockResult = {
  nonce: number
  hash: string
}

export const mineBlock = ({
  version,
  previousBlockHash,
  merkleRoot,
  timestamp,
  bits,
  startNonce,
}: MineBlockInput): MineBlockResult => {
  let nonce = startNonce

  while (true) {
    const hash = getBlockHash({
      version,
      previousBlockHash,
      merkleRoot,
      timestamp,
      bits,
      nonce,
    })

    if (checkDifficulty(hash, bits)) {
      return {
        nonce,
        hash,
      }
    }

    nonce++
  }
}
