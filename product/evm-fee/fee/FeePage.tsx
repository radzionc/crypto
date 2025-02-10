import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import styled from 'styled-components'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import { ProductLogo } from '../product/ProductLogo'
import { VStack } from '@lib/ui/css/stack'
import { MaxPriorityFeePerGas } from './maxPriorityFeePerGas/MaxPriorityFeePerGas'
import { MaxFeePerGas } from './maxFeePerGas/MaxFeePerGas'
import { BaseFee } from './baseFee/BaseFee'
import { MaxFee } from './maxFee/MaxFee'

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
