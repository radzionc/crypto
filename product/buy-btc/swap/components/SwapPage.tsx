import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { VStack } from '@lib/ui/css/stack'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import styled from 'styled-components'

import { ProductLogo } from '../../product/ProductLogo'
import { ExitWallet } from '../../wallet/components/ExitWallet'
import { WalletGuard } from '../../wallet/components/WalletGuard'
import { chains } from '../core/chains'
import { AddressProvider } from '../state/address'
import { AmountProvider } from '../state/amount'
import { SourceChainIdProvider } from '../state/sourceChainId'

import { ManageAddress } from './ManageAddress'
import { ManageAmount } from './ManageAmount'
import { ManageChain } from './ManageChain'
import { SwapQuote } from './SwapQuote'

export const PageContainer = styled.div`
  ${centeredContentColumn({
    contentMaxWidth: 480,
  })}

  ${verticalPadding(80)}
`

export const SwapPage = () => (
  <>
    <PageMetaTags
      title="Buy Bitcoin with ETH, BNB, or AVAX | THORChain Swap"
      description="Easily swap your ETH, BNB, or AVAX for Bitcoin using THORChain. Get real-time quotes and secure cross-chain swaps with minimal fees."
    />
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
