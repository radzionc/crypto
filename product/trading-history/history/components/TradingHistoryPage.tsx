import { PageMetaTags } from '@lib/next-ui/metadata/PageMetaTags'
import { ClientOnly } from '@lib/ui/base/ClientOnly'
import { centeredContentColumn } from '@lib/ui/css/centeredContentColumn'
import { HStack, VStack, vStack } from '@lib/ui/css/stack'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { TabNavigation } from '@lib/ui/navigation/TabNavigation'
import { websiteConfig } from '@lib/ui/website/config'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import styled from 'styled-components'

import { AlchemyApiKeyGuard } from '../../alchemy/components/AlchemyApiKeyGuard'
import { ExitAlchemy } from '../../alchemy/components/ExitAlchemy'
import { AssetType } from '../../entities/Trade'
import { ProductLogo } from '../../product/ProductLogo'
import { AddressesOnly } from '../addresses/AddressesOnly'
import { ManageAddresses } from '../addresses/ManageAddresses'
import { useSelectedAssetType } from '../state/selectedAssetType'

import { Trades } from './Trades'

export const PageContainer = styled.div`
  ${centeredContentColumn({
    contentMaxWidth: websiteConfig.contentMaxWidth,
  })}

  ${verticalPadding(80)}
`

const Content = styled.div`
  ${vStack({ gap: 20, fullWidth: true })}
  max-width: 720px;
`

const assetTypes: readonly AssetType[] = ['ETH', 'BTC'] as const

const getAssetTypeName = (assetType: AssetType): string => {
  return assetType === 'ETH' ? 'ETH & WETH' : 'BTC (wBTC & cbBTC)'
}

export const TradingHistoryPage = () => {
  const [selectedAssetType, setSelectedAssetType] = useSelectedAssetType()

  return (
    <>
      <PageMetaTags
        title="Crypto Trading History - ETH & BTC"
        description="Track ETH, WETH, wBTC, and cbBTC trades on Ethereum, Polygon, and Base. Monitor your trading history and get insights on when to buy or sell."
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
                <Content>
                  <VStack gap={40}>
                    <TabNavigation
                      views={assetTypes}
                      getViewName={getAssetTypeName}
                      activeView={selectedAssetType}
                      onSelect={(assetType) =>
                        setSelectedAssetType(assetType as AssetType)
                      }
                    />
                    <AddressesOnly>
                      <Trades />
                    </AddressesOnly>
                  </VStack>
                </Content>
                <ManageAddresses />
              </HStack>
            </PageContainer>
          </WebsiteNavigation>
        </AlchemyApiKeyGuard>
      </ClientOnly>
    </>
  )
}
