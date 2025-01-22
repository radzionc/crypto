/**
 * Checks if a hash meets the difficulty target specified by bits.
 * The bits field is Bitcoin's compact format for target threshold.
 */
export const checkDifficulty = (hash: string, bits: number): boolean => {
  // Convert bits to target threshold
  const exponent = bits >> 24
  const coefficient = bits & 0x007fffff

  // Calculate target based on Bitcoin's difficulty formula
  // target = coefficient * 2^(8 * (exponent - 3))
  const targetBytes = Buffer.alloc(32).fill(0)

  // Convert coefficient to bytes
  const coefficientHex = coefficient.toString(16).padStart(6, '0')
  Buffer.from(coefficientHex, 'hex').copy(
    targetBytes,
    32 - Math.floor(((exponent + 1) * 8) / 8),
  )

  // Get target as hex string
  const targetHex = targetBytes.toString('hex')

  // Compare hash with target (hash must be less than or equal to target)
  return hash <= targetHex
}
