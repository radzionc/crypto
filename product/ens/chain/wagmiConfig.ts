import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { http } from 'viem'

import { productName } from '../product/config'

import { chains } from '.'

export const wagmiConfig = getDefaultConfig({
  appName: productName,
  projectId: shouldBePresent(process.env.NEXT_PUBLIC_REOWN_PROJECT_ID),
  chains,
  transports: recordFromKeys(
    chains.map((chain) => chain.id),
    () => http(),
  ),
})
