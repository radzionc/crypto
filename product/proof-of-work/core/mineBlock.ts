import { getBlockHash } from './getBlockHash'
import { checkDifficulty } from './checkDifficulty'
import { BlockData } from './BlockData'

type MineBlockInput = {
  blockData: Omit<BlockData, 'nonce'>
  startNonce: number
}

type MineBlockResult = {
  nonce: number
  hash: string
}

export const mineBlock = ({
  blockData,
  startNonce,
}: MineBlockInput): MineBlockResult => {
  let nonce = startNonce

  while (true) {
    const hash = getBlockHash({
      ...blockData,
      nonce,
    })

    if (checkDifficulty(hash, blockData.bits)) {
      return {
        nonce,
        hash,
      }
    }

    nonce++
  }
}
