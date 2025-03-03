import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { Text } from '@lib/ui/text'
import { toPercents } from '@lib/utils/toPercents'

import { baseFeeMultiplier } from '../baseFee/config'
import { FeeSection } from '../FeeSection'

export const MaxFeePerGas = () => (
  <FeeSection
    title={
      <>
        maxFeePerGas
        <Text as="span" color="contrast">
          {' '}
          = maxPriorityFeePerGas + baseFee × {baseFeeMultiplier}
        </Text>
      </>
    }
  >
    <ShyInfoBlock>
      <Text color="supporting">
        We multiply the base fee by {baseFeeMultiplier} to account for the
        maximum allowed {toPercents(baseFeeMultiplier - 1)} increase in the base
        fee between blocks. This buffer helps ensure that your transaction
        remains competitive even if the network congestion causes the base fee
        to rise unexpectedly.
      </Text>
    </ShyInfoBlock>
  </FeeSection>
)
