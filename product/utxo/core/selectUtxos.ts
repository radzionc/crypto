import { ConfirmedUtxo } from './utxo'

export const selectUtxos = (
  utxos: ConfirmedUtxo[],
  targetAmount: bigint,
): ConfirmedUtxo[] => {
  // Sort UTXOs by value (ascending)
  const sortedUtxos = [...utxos].sort((a, b) => a.value - b.value)

  // Strategy 1: Look for exact match
  const exactMatch = sortedUtxos.find(
    (utxo) => BigInt(utxo.value) === targetAmount,
  )
  if (exactMatch) {
    return [exactMatch]
  }

  // Strategy 2: Look for single UTXO larger than target
  const singleMatch = sortedUtxos.find((utxo) => utxo.value > targetAmount)
  if (singleMatch) {
    return [singleMatch]
  }

  // Strategy 3: Accumulative strategy
  const selectedUtxos: ConfirmedUtxo[] = []
  let currentSum = 0

  // Start with largest UTXOs to minimize number of inputs
  for (let i = sortedUtxos.length - 1; i >= 0; i--) {
    const utxo = sortedUtxos[i]
    selectedUtxos.push(utxo)
    currentSum += utxo.value

    if (currentSum >= targetAmount) {
      return selectedUtxos
    }
  }

  // If we get here, we don't have enough funds
  throw new Error('Insufficient funds to cover target amount')
}
