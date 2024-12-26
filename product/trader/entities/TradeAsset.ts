import { Address } from 'viem'
import { polygon } from 'viem/chains'

export const tradeAssets = ['weth', 'usdc'] as const

export type TradeAsset = (typeof tradeAssets)[number]

export const tradeAssetAddress: Record<TradeAsset, Address> = {
  weth: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  usdc: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
}

export const tradeAssetPriceProividerId: Record<TradeAsset, string> = {
  weth: 'polygon:weth',
  usdc: 'polygon:usdc',
}

export const tradeChain = polygon
