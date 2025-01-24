type ConfirmedStatus = {
  confirmed: true
  block_height: number
  block_hash: string
  block_time: number
}

type UnconfirmedStatus = {
  confirmed: false
}

export type Utxo = {
  txid: string
  vout: number
  status: ConfirmedStatus | UnconfirmedStatus
  value: number
}

export type ConfirmedUtxo = Omit<Utxo, 'status'> & {
  status: ConfirmedStatus
  value: number
}

export const getConfirmedUtxos = (utxos: Utxo[]): ConfirmedUtxo[] => {
  return utxos.filter((utxo): utxo is ConfirmedUtxo => utxo.status.confirmed)
}
