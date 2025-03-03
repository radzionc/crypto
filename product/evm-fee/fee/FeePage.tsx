import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { VStack } from '@lib/ui/css/stack'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import styled from 'styled-components'

import { ProductLogo } from '../product/ProductLogo'

import { BaseFee } from './baseFee/BaseFee'
import { MaxFee } from './maxFee/MaxFee'
import { MaxFeePerGas } from './maxFeePerGas/MaxFeePerGas'
import { MaxPriorityFeePerGas } from './maxPriorityFeePerGas/MaxPriorityFeePerGas'

export const PageContainer = styled.div`
  ${centeredContentColumn({
    contentMaxWidth: 520,
  })}

  ${verticalPadding(80)}
`

export const FeePage = () => (
  <>
    <PageMetaTags
      title="EVM Gas Fee Calculator | Real-time Gas Price Monitoring"
      description="Monitor real-time Ethereum gas fees, including max priority fees, base fees, and max fees per gas. Get accurate estimates for your EVM transactions."
    />

    <WebsiteNavigation logo={<ProductLogo />}>
      <PageContainer>
        <VStack gap={40}>
          <MaxFee />
          <MaxPriorityFeePerGas />
          <MaxFeePerGas />
          <BaseFee />
        </VStack>
      </PageContainer>
    </WebsiteNavigation>
  </>
)
