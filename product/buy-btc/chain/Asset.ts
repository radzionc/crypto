import { ChainId } from './config'

// An asset without an address is a native asset
export type Asset = {
  chainId: ChainId
  address?: string
}
