import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import styled from 'styled-components'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import { ProductLogo } from '../product/ProductLogo'
import { VStack } from '@lib/ui/css/stack'
import { MaxPriorityFeePerGas } from './maxPriorityFeePerGas/MaxPriorityFeePerGas'
import { FeeSection } from './FeeSection'

export const PageContainer = styled.div`
  ${centeredContentColumn({
    contentMaxWidth: 480,
  })}

  ${verticalPadding(80)}
`

export const FeePage = () => (
  <>
    <PageMetaTags title="" description="" />

    <WebsiteNavigation logo={<ProductLogo />}>
      <PageContainer>
        <VStack gap={60}>
          <FeeSection title="maxPriorityFeePerGas">
            <MaxPriorityFeePerGas />
          </FeeSection>
        </VStack>
      </PageContainer>
    </WebsiteNavigation>
  </>
)
