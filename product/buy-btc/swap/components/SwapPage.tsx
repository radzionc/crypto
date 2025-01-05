import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { WalletGuard } from '../../wallet/components/WalletGuard'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import { ProductLogo } from '../../product/ProductLogo'
import { ExitWallet } from '../../wallet/components/ExitWallet'
import styled from 'styled-components'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { ChainIdProvider } from '../state/chainId'
import { chains } from '../../chain/config'
import { SwapForm } from './SwapForm'

export const PageContainer = styled.div`
  ${centeredContentColumn({
    contentMaxWidth: 480,
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
          <PageContainer>
            <ChainIdProvider initialValue={chains[0].id}>
              <SwapForm />
            </ChainIdProvider>
          </PageContainer>
        </WebsiteNavigation>
      </WalletGuard>
    </ClientOnly>
  </>
)
