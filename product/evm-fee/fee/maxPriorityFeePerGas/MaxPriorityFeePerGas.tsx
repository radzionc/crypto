import { VStack } from '@lib/ui/css/stack'
import { PriorityOptions } from './options/PriorityOptions'
import { FeeSection } from '../FeeSection'
import { MaxPriorityFeePerGasTitle } from './MaxPriorityFeePerGasTitle'
import { FeeChart } from './chart/FeeChart'

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
