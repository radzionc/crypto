import { sum } from '@lib/utils/array/sum'
import { UTXO } from './utxo'

export const getBalance = (utxos: UTXO[]) => {
  return sum(
    utxos.filter((utxo) => utxo.status.confirmed).map((utxo) => utxo.value),
  )
}
