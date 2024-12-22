import { getEnvVar } from '../getEnvVar'
import { polygon } from 'viem/chains'
import { Address } from 'viem'
import { swapErc20Tokens } from '../utils/swapErc20Tokens'

const weth = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
const usdc = '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'

const swap = async () => {
  const hash = await swapErc20Tokens({
    zeroXApiKey: getEnvVar('ZEROX_API_KEY'),
    accountAddress: getEnvVar('ACCOUNT_ADDRESS') as Address,
    chain: polygon,
    from: weth,
    to: usdc,
  })

  console.log(hash)
}

swap()
