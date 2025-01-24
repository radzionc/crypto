import { btc } from '@lib/chain/bitcoin/btc'
import { queryUrl } from '@lib/utils/query/queryUrl'
import { getConfirmedUtxos, Utxo } from './core/utxo'
import { getBalance } from './core/getBalance'
import { selectUtxos } from './core/selectUtxos'
import { toChainAmount } from '@lib/chain/utils/toChainAmount'
import { sum } from '@lib/utils/array/sum'
import { formatChainAmount } from '@lib/chain/utils/formatChainAmount'

const test = async () => {
  const address =
    'bc1qa2eu6p5rl9255e3xz7fcgm6snn4wl5kdfh7zpt05qp5fad9dmsys0qjg0e'

  console.log(`\nFetching UTXOs for address: ${address}`)
  const utxos = await queryUrl<Utxo[]>(
    `https://blockstream.info/api/address/${address}/utxo`,
  )

  const confirmedUtxos = getConfirmedUtxos(utxos)

  console.log(`\nFound ${confirmedUtxos.length} UTXOs:`)
  confirmedUtxos.forEach((utxo, index) => {
    console.log(`\nUTXO #${index + 1}:`)
    console.log(`Transaction ID: ${utxo.txid}`)
    console.log(`Output Index: ${utxo.vout}`)
    console.log(`Amount: ${formatChainAmount(utxo.value, btc)}`)
    console.log(`Block Height: ${utxo.status.block_height}`)
    console.log(`Block Time: ${utxo.status.block_time}`)
    console.log(`Block Hash: ${utxo.status.block_hash}`)
  })

  const balance = getBalance(confirmedUtxos)
  console.log(`\nTotal Balance: ${formatChainAmount(balance, btc)}`)

  const btcToSpend = toChainAmount(10, btc.decimals)
  const estimatedFee = BigInt(1000)

  const btcTargetAmount = btcToSpend + estimatedFee

  console.log(
    `\nAttempting to select UTXOs for spending ${formatChainAmount(
      btcTargetAmount,
      btc,
    )}...`,
  )
  const selectedUtxos = selectUtxos(confirmedUtxos, btcTargetAmount)

  console.log('\nSelected UTXOs:')
  const totalSelected = sum(selectedUtxos.map((utxo) => utxo.value))

  selectedUtxos.forEach((utxo, index) => {
    console.log(`\nInput #${index + 1}:`)
    console.log(`Transaction ID: ${utxo.txid}`)
    console.log(`Output Index: ${utxo.vout}`)
    console.log(`Amount: ${formatChainAmount(utxo.value, btc)}`)
  })

  console.log('\nTransaction Summary:')
  console.log(`Total Input Amount: ${formatChainAmount(totalSelected, btc)}`)
  console.log(`Target Amount: ${formatChainAmount(btcTargetAmount, btc)}`)
  console.log(`Network Fee: ${formatChainAmount(estimatedFee, btc)}`)
  console.log(
    `Change Amount: ${formatChainAmount(
      BigInt(totalSelected) - btcTargetAmount,
      btc,
    )}`,
  )
}

test()
