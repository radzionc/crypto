import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { WalletGuard } from '../../wallet/components/WalletGuard'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import { ProductLogo } from '../../product/ProductLogo'
import { ExitWallet } from '../../wallet/components/ExitWallet'
import styled from 'styled-components'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { websiteConfig } from '@lib/ui/website/config'

export const PageContainer = styled.div`
  ${centeredContentColumn({
    contentMaxWidth: websiteConfig.contentMaxWidth,
  })}

  ${verticalPadding(80)}
`

export const SwapPage = () => (
  <>
    <PageMetaTags title="" description="" />
    <ClientOnly>
      <WalletGuard>
        <WebsiteNavigation
          renderTopbarItems={() => (
            <>
              <div />
              <ExitWallet />
            </>
          )}
          renderOverlayItems={() => <ExitWallet />}
          logo={<ProductLogo />}
        >
          <PageContainer>Coming soon</PageContainer>
        </WebsiteNavigation>
      </WalletGuard>
    </ClientOnly>
  </>
)
