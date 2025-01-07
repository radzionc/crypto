import { useAddress } from '../state/address'
import { useAmount } from '../state/amount'
import { useStateDependentQuery } from '@lib/ui/query/hooks/useStateDependentQuery'
import { useAsset } from '../state/asset'
import { getQuote } from '../core/getQuote'

export const useQuoteQuery = () => {
  const [address] = useAddress()
  const [amount] = useAmount()
  const [asset] = useAsset()

  return useStateDependentQuery({
    state: {
      address: address || undefined,
      amount: amount || undefined,
    },
    getQuery: ({ address, amount }) => {
      return {
        queryKey: ['quote', address, amount],
        queryFn: () => getQuote({ address, amount, asset }),
      }
    },
  })
}
