import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { AlchemyApiKeyGuard } from '../../alchemy/components/AlchemyApiKeyGuard'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import { ProductLogo } from '../../product/ProductLogo'
import { ExitAlchemy } from '../../alchemy/components/ExitAlchemy'
import { Trades } from './Trades'
import styled from 'styled-components'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { websiteConfig } from '@lib/ui/website/config'
import { HStack } from '@lib/ui/css/stack'
import { ManageAddresses } from '../addresses/ManageAddresses'
import { AddressesOnly } from '../addresses/AddressesOnly'

export const PageContainer = styled.div`
  ${centeredContentColumn({
    contentMaxWidth: websiteConfig.contentMaxWidth,
  })}

  ${verticalPadding(80)}
`

export const TradingHistoryPage = () => (
  <>
    <PageMetaTags
      title="ETH & WETH Trading History"
      description="Track ETH and WETH trades on Ethereum and Polygon. Easily check your trading history and decide if it’s a good time to buy or sell."
    />
    <ClientOnly>
      <AlchemyApiKeyGuard>
        <WebsiteNavigation
          renderTopbarItems={() => (
            <>
              <div />
              <ExitAlchemy />
            </>
          )}
          renderOverlayItems={() => <ExitAlchemy />}
          logo={<ProductLogo />}
        >
          <PageContainer>
            <HStack fullWidth wrap="wrap" gap={60}>
              <AddressesOnly>
                <Trades />
              </AddressesOnly>
              <ManageAddresses />
            </HStack>
          </PageContainer>
        </WebsiteNavigation>
      </AlchemyApiKeyGuard>
    </ClientOnly>
  </>
)
