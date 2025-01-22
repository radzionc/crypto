import { bitcoinHash } from '@lib/chain/bitcoin/bitcoinHash'

export const toBitcoinMerkleNode = (pair: [string, string]): string => {
  const concatenated = Buffer.concat(
    pair.map((hex) => Buffer.from(hex, 'hex').reverse()),
  )

  return bitcoinHash(concatenated)
}
