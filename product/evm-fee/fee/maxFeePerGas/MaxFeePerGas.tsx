import styled from 'styled-components'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { Text } from '@lib/ui/text'
import { FeeSection } from '../FeeSection'
import { toPercents } from '@lib/utils/toPercents'

const baseFeeMultiplier = 1.125

export const PageContainer = styled.div`
  ${centeredContentColumn({
    contentMaxWidth: 520,
  })}

  ${verticalPadding(80)}
`

export const MaxFeePerGas = () => (
  <FeeSection
    title={
      <>
        maxFeePerGas
        <Text as="span" color="supporting">
          {' '}
          = maxPriorityFeePerGas + baseFee × {baseFeeMultiplier}
        </Text>
      </>
    }
  >
    <ShyInfoBlock>
      <Text color="supporting">
        We multiply the base fee by{' '}
        <Text as="span" color="contrast" weight="600">
          {baseFeeMultiplier}
        </Text>{' '}
        to account for the maximum allowed {toPercents(baseFeeMultiplier - 1)}{' '}
        increase in the base fee between blocks. This buffer helps ensure that
        your transaction remains competitive even if the network congestion
        causes the base fee to rise unexpectedly.
      </Text>
    </ShyInfoBlock>
  </FeeSection>
)
