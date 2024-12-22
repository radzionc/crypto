import { Address } from 'viem'

export const limitOrderAssets = ['weth', 'usdc'] as const

export type LimitOrderAsset = (typeof limitOrderAssets)[number]

export const limitOrderAssetAddress: Record<LimitOrderAsset, Address> = {
  weth: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  usdc: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
}

export const limitOrderAssetPriceProividerId: Record<LimitOrderAsset, string> =
  {
    weth: 'polygon:weth',
    usdc: 'polygon:usdc',
  }
