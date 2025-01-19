import { createHash } from 'crypto'

import { pipe } from '@lib/utils/pipe'

const sha256 = (data: Buffer): Buffer =>
  createHash('sha256').update(data).digest()

export const toBitcoinMerkleNode = (pair: [string, string]): string => {
  const concatenated = Buffer.concat(
    pair.map((hex) => Buffer.from(hex, 'hex').reverse()),
  )

  return pipe(concatenated, sha256, sha256).reverse().toString('hex')
}
