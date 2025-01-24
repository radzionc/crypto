import { btc } from '@lib/chain/bitcoin/btc'
import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'
import { queryUrl } from '@lib/utils/query/queryUrl'
import { UTXO } from './core/utxo'
import { getBalance } from './core/getBalance'
import { formatAmount } from '@lib/utils/formatAmount'

const test = async () => {
  const address =
    'bc1qa2eu6p5rl9255e3xz7fcgm6snn4wl5kdfh7zpt05qp5fad9dmsys0qjg0e'

  console.log(`\nFetching UTXOs for address: ${address}`)
  const utxos = await queryUrl<UTXO[]>(
    `https://blockstream.info/api/address/${address}/utxo`,
  )

  console.log(`\nFound ${utxos.length} UTXOs:`)
  utxos.forEach((utxo, index) => {
    console.log(`\nUTXO #${index + 1}:`)
    console.log(`Transaction ID: ${utxo.txid}`)
    console.log(`Output Index: ${utxo.vout}`)
    console.log(
      `Amount: ${formatAmount(fromChainAmount(utxo.value, btc.decimals))} ${btc.symbol}`,
    )
    console.log(`Confirmed: ${utxo.status.confirmed ? 'Yes ✅' : 'No ❌'}`)
    console.log(`Block Height: ${utxo.status.block_height}`)
    console.log(`Block Time: ${utxo.status.block_time}`)
    console.log(`Block Hash: ${utxo.status.block_hash}`)
  })

  const balance = getBalance(utxos)
  console.log(
    `\nTotal Balance: ${formatAmount(fromChainAmount(balance, btc.decimals))} ${btc.symbol}`,
  )
}

test()
