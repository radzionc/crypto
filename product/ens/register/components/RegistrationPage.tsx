import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import styled from 'styled-components'

import { ProductLogo } from '../../product/ProductLogo'

import { RegistrationFlow } from './RegistrationFlow'

export const PageContainer = styled.div`
  ${centeredContentColumn({
    contentMaxWidth: 480,
  })}

  ${verticalPadding(80)}
`

export const RegistrationPage = () => (
  <>
    <PageMetaTags
      title="Register ENS Name | Secure Your Web3 Identity"
      description="Register your unique .eth domain name with ENS. Get a human-readable address for your crypto wallet, websites, and more. Simple, secure, and decentralized."
    />
    <ClientOnly>
      <WebsiteNavigation logo={<ProductLogo />}>
        <PageContainer>
          <RegistrationFlow />
        </PageContainer>
      </WebsiteNavigation>
    </ClientOnly>
  </>
)
