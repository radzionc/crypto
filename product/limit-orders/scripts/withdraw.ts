import { privateKeyToAddress } from 'viem/accounts'
import { getErc20Balance } from '../../../lib/chain/evm/erc20/getErc20Balance'
import {
  limitOrderAssetAddress,
  limitOrderAssets,
  limitOrderChain,
} from '../entities/LimitOrderAsset'
import { getSecret } from '../getSercret'
import { transferErc20Token } from '../../../lib/chain/evm/erc20/transferErc20Token'

const withdraw = (address: `0x${string}`) =>
  Promise.all(
    limitOrderAssets.map(async (asset) => {
      const assetAddress = limitOrderAssetAddress[asset]

      const privateKey = await getSecret<`0x${string}`>(`accountPrivateKey`)

      const amount = await getErc20Balance({
        chain: limitOrderChain,
        accountAddress: privateKeyToAddress(privateKey),
        address: assetAddress,
      })

      if (amount === BigInt(0)) {
        return
      }

      return transferErc20Token({
        chain: limitOrderChain,
        privateKey,
        tokenAddress: assetAddress,
        to: address,
        amount,
      })
    }),
  )

const address = process.argv[2] as `0x${string}`

withdraw(address)
