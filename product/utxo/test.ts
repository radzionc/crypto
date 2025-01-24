import { btc } from '@lib/chain/bitcoin/btc'
import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'
import { queryUrl } from '@lib/utils/query/queryUrl'
import { getConfirmedUtxos, Utxo } from './core/utxo'
import { getBalance } from './core/getBalance'
import { formatAmount } from '@lib/utils/formatAmount'
import { selectUtxos } from './core/selectUtxos'

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
    console.log(
      `Amount: ${formatAmount(fromChainAmount(utxo.value, btc.decimals))} ${btc.symbol}`,
    )
    console.log(`Block Height: ${utxo.status.block_height}`)
    console.log(`Block Time: ${utxo.status.block_time}`)
    console.log(`Block Hash: ${utxo.status.block_hash}`)
  })

  const balance = getBalance(confirmedUtxos)
  console.log(
    `\nTotal Balance: ${formatAmount(fromChainAmount(balance, btc.decimals))} ${btc.symbol}`,
  )

  // Try to spend 10 BTC
  const targetAmountBTC = 10
  const targetAmountSats = targetAmountBTC * 100_000_000 // Convert BTC to satoshis

  // Estimate fee (assuming P2WPKH, 2 outputs - recipient and change)
  // Conservative estimate: 200 vBytes * 5 sats/vByte = 1000 sats
  const estimatedFee = 1000

  try {
    console.log(
      `\nAttempting to select UTXOs for spending ${targetAmountBTC} BTC...`,
    )
    const selectedUtxos = selectUtxos(
      confirmedUtxos,
      targetAmountSats + estimatedFee,
    )

    console.log('\nSelected UTXOs:')
    const totalSelected = selectedUtxos.reduce(
      (sum, utxo) => sum + utxo.value,
      0,
    )

    selectedUtxos.forEach((utxo, index) => {
      console.log(`\nInput #${index + 1}:`)
      console.log(`Transaction ID: ${utxo.txid}`)
      console.log(`Output Index: ${utxo.vout}`)
      console.log(
        `Amount: ${formatAmount(fromChainAmount(utxo.value, btc.decimals))} ${btc.symbol}`,
      )
    })

    console.log('\nTransaction Summary:')
    console.log(
      `Total Input Amount: ${formatAmount(fromChainAmount(totalSelected, btc.decimals))} ${btc.symbol}`,
    )
    console.log(`Target Amount: ${formatAmount(targetAmountBTC)} ${btc.symbol}`)
    console.log(
      `Network Fee: ${formatAmount(fromChainAmount(estimatedFee, btc.decimals))} ${btc.symbol}`,
    )
    console.log(
      `Change Amount: ${formatAmount(fromChainAmount(totalSelected - targetAmountSats - estimatedFee, btc.decimals))} ${btc.symbol}`,
    )
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('\nError:', error.message)
    } else {
      console.error('\nUnknown error occurred')
    }
  }
}

test()
