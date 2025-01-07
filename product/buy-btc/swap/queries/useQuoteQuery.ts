import { useAddress } from '../state/address'
import { useAmount } from '../state/amount'
import { useStateDependentQuery } from '@lib/ui/query/hooks/useStateDependentQuery'
import { getQuote } from '../core/getQuote'
import { useSourceChainId } from '../state/sourceChainId'

export const useQuoteQuery = () => {
  const [address] = useAddress()
  const [amount] = useAmount()
  const [chainId] = useSourceChainId()

  return useStateDependentQuery({
    state: {
      address: address || undefined,
      amount: amount || undefined,
    },
    getQuery: ({ address, amount }) => {
      return {
        queryKey: ['quote', address, amount],
        queryFn: () => getQuote({ address, amount, chainId }),
      }
    },
  })
}
