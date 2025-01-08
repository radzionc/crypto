import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'

export const { provider: AmountProvider, useState: useAmount } =
  getStateProviderSetup<number | null>('amount')
