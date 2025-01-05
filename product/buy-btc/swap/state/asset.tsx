import { ContextState } from '@lib/ui/state/ContextState'
import { createContext, useCallback, useState } from 'react'
import { areAssetsEqual, Asset } from '../../chain/Asset'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useAssets } from './assets'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { createContextHook } from '@lib/ui/state/createContextHook'

const AssetContext = createContext<ContextState<Asset> | undefined>(undefined)

export const AssetProvider = ({ children }: ComponentWithChildrenProps) => {
  const assets = useAssets()

  const [value, setValue] = useStateCorrector(
    useState<Asset>(assets[0]),
    useCallback(
      (asset) => {
        if (!assets.find((a) => areAssetsEqual(a, asset))) {
          return assets[0]
        }

        return asset
      },
      [assets],
    ),
  )

  return (
    <AssetContext.Provider value={{ value, setValue }}>
      {children}
    </AssetContext.Provider>
  )
}

export const useAsset = createContextHook(
  AssetContext,
  'Asset',
  ({ value, setValue }) => [value, setValue] as const,
)
