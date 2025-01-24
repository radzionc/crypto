import { order } from '@lib/utils/array/order'
import { ConfirmedUtxo } from './utxo'

export const selectUtxos = (
  utxos: ConfirmedUtxo[],
  targetAmount: bigint,
): ConfirmedUtxo[] => {
  const sortedUtxos = order(utxos, ({ value }) => value, 'asc')

  const singleUtxo = sortedUtxos.find(
    (utxo) => BigInt(utxo.value) >= targetAmount,
  )
  if (singleUtxo) {
    return [singleUtxo]
  }

  const selectedUtxos: ConfirmedUtxo[] = []
  let currentSum = 0

  for (const utxo of sortedUtxos.toReversed()) {
    selectedUtxos.push(utxo)
    currentSum += utxo.value

    if (currentSum >= targetAmount) {
      return selectedUtxos
    }
  }

  throw new Error('Insufficient funds to cover target amount')
}
