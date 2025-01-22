import { bitcoinHash } from '@lib/chain/bitcoin/bitcoinHash'

type GetBlockHashInput = {
  version: number
  previousBlockHash: string
  merkleRoot: string
  timestamp: number
  bits: number
  nonce: number
}

export const getBlockHash = ({
  version,
  previousBlockHash,
  merkleRoot,
  timestamp,
  bits,
  nonce,
}: GetBlockHashInput): string => {
  const header = Buffer.alloc(80)

  header.writeInt32LE(version, 0)

  Buffer.from(previousBlockHash, 'hex').reverse().copy(header, 4)

  Buffer.from(merkleRoot, 'hex').reverse().copy(header, 36)

  header.writeUInt32LE(timestamp, 68)

  header.writeUInt32LE(bits, 72)

  header.writeUInt32LE(nonce, 76)

  return bitcoinHash(header)
}
