import { sum } from '@lib/utils/array/sum'
import { ConfirmedUtxo } from './utxo'

export const getBalance = (utxos: ConfirmedUtxo[]) => {
  return sum(utxos.map((utxo) => utxo.value))
}
