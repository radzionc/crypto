import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { WalletGuard } from '../../wallet/components/WalletGuard'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import { ProductLogo } from '../../product/ProductLogo'
import { ExitWallet } from '../../wallet/components/ExitWallet'
import styled from 'styled-components'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { chains } from '../../chain/config'
import { AddressProvider } from '../state/address'
import { AmountProvider } from '../state/amount'
import { VStack } from '@lib/ui/css/stack'
import { ManageChain } from './ManageChain'
import { ManageAmount } from './ManageAmount'
import { SwapQuote } from './SwapQuote'
import { ManageAddress } from './ManageAddress'
import { SourceChainIdProvider } from '../state/sourceChainId'

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
            <SourceChainIdProvider initialValue={chains[0].id}>
              <AddressProvider initialValue="">
                <AmountProvider initialValue={null}>
                  <VStack gap={20}>
                    <ManageChain />
                    <ManageAmount />
                    <ManageAddress />
                    <SwapQuote />
                  </VStack>
                </AmountProvider>
              </AddressProvider>
            </SourceChainIdProvider>
          </PageContainer>
        </WebsiteNavigation>
      </WalletGuard>
    </ClientOnly>
  </>
)
