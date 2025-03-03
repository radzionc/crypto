import { VStack } from '@lib/ui/css/stack'

import { FeeSection } from '../FeeSection'

import { FeeChart } from './chart/FeeChart'
import { MaxPriorityFeePerGasTitle } from './MaxPriorityFeePerGasTitle'
import { PriorityOptions } from './options/PriorityOptions'

export const MaxPriorityFeePerGas = () => {
  return (
    <FeeSection title={<MaxPriorityFeePerGasTitle />}>
      <VStack gap={40}>
        <PriorityOptions />
        <FeeChart />
      </VStack>
    </FeeSection>
  )
}
