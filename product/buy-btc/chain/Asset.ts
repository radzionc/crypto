import { ChainId } from './config'
import { haveEqualFields } from '@lib/utils/record/haveEqualFields'

// An asset without an address is a native asset
export type Asset = {
  chainId: ChainId
  address?: string
  symbol: string
}

export const areAssetsEqual = (...args: Asset[]) =>
  haveEqualFields(['chainId', 'address'], ...args)
