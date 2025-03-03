import { fromChainAmount } from '@lib/chain/utils/fromChainAmount'
import { toChainAmount } from '@lib/chain/utils/toChainAmount'
import { formatAmount } from '@lib/utils/formatAmount'
import { addQueryParams } from '@lib/utils/query/addQueryParams'
import { queryUrl } from '@lib/utils/query/queryUrl'
import { mirrorRecord } from '@lib/utils/record/mirrorRecord'

import { ChainId, getChain } from '../core/chains'

import { thorChainRecord } from './thor'

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
