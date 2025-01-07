import { addQueryParams } from '@lib/utils/query/addQueryParams'
import { toChainAmount } from '@lib/chain/utils/toChainAmount'
import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'
import { ChainId, getChain, thorChainRecord } from '../../chain/config'
import { mirrorRecord } from '@lib/utils/record/mirrorRecord'
import { queryUrl } from '@lib/utils/query/queryUrl'
import { formatAmount } from '@lib/utils/formatAmount'

type GetQuoteInput = {
  address: string
  amount: number
  chainId: ChainId
}

export type QuoteResponse = {
  dust_threshold?: string
  expected_amount_out: string
  expiry: number
  fees: {
    affiliate: string
    asset: string
    outbound: string
    total: string
  }
  inbound_address?: string
  inbound_confirmation_blocks?: number
  inbound_confirmation_seconds?: number
  memo: string
  notes: string
  outbound_delay_blocks: number
  outbound_delay_seconds: number
  recommended_min_amount_in: string
  slippage_bps?: number
  total_swap_seconds?: number
  warning: string
  router?: string
}

/*
Response example:

{ "inbound_address": "0x5a206b77d4d40a9d507babb195dd2dda9f9424f4", "outbound_delay_blocks": 448, "outbound_delay_seconds": 2688, "fees": { "asset": "BTC.BTC", "affiliate": "0", "outbound": "4062", "liquidity": "156992", "total": "161054", "slippage_bps": 16, "total_bps": 16 }, "router": "0xb30ec53f98ff5947ede720d32ac2da7e52a5f56b", "expiry": 1736240089, "warning": "Do not cache this response. Do not send funds after the expiry.", "notes": "Base Asset: Send the inbound_address the asset with the memo encoded in hex in the data field. Tokens: First approve router to spend tokens from user: asset.approve(router, amount). Then call router.depositWithExpiry(inbound_address, asset, amount, memo, expiry). Asset is the token contract address. Amount should be in native asset decimals (eg 1e18 for most tokens). Do not swap to smart contract addresses.", "recommended_min_amount_in": "1654902892", "recommended_gas_rate": "1", "gas_rate_units": "gwei", "memo": "=:BTC.BTC:bc1qrdg6a8wkjhnwdd3s6v4f3spupxpnz30px9468w:0/1/0", "expected_amount_out": "97940466", "max_streaming_quantity": 176, "streaming_swap_blocks": 175, "streaming_swap_seconds": 1050, "total_swap_seconds": 2688 }
*/

type QuoteErrorResponse = {
  error: string
}

const baseUrl = 'https://thornode.ninerealms.com/thorchain/quote/swap'

const decimals = 8

export const getQuote = async ({ address, amount, chainId }: GetQuoteInput) => {
  const chainPrefix = mirrorRecord(thorChainRecord)[chainId]

  const chainAmount = toChainAmount(amount, decimals)

  const url = addQueryParams(baseUrl, {
    from_asset: `${chainPrefix}.${chainPrefix}`,
    to_asset: 'BTC.BTC',
    amount: chainAmount.toString(),
    destination: address,
    streaming_interval: 1,
  })

  const result = await queryUrl<QuoteResponse | QuoteErrorResponse>(url)

  if ('error' in result) {
    throw new Error(result.error)
  }

  if (BigInt(result.recommended_min_amount_in) > chainAmount) {
    const minAmount = fromChainAmount(
      result.recommended_min_amount_in,
      decimals,
    )

    const formattedMinAmount = formatAmount(minAmount)

    const { nativeCurrency } = getChain(chainId)

    const msg = `You need to swap at least ${formattedMinAmount} ${nativeCurrency.symbol}`

    throw new Error(msg)
  }

  return result
}
