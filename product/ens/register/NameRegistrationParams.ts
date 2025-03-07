import { Seconds } from '@lib/utils/time/types'
import { UseWalletClientReturnType } from 'wagmi'

export type NameRegistrationParams = {
  name: string
  walletClient: NonNullable<UseWalletClientReturnType['data']>
  duration: Seconds
}
