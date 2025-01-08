import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'

export const { provider: AddressProvider, useState: useAddress } =
  getStateProviderSetup<string>('address')
