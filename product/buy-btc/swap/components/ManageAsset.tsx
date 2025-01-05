import { SelectOptionInput } from '@lib/ui/inputs/dropdown/DropdownInput'
import { DropdownOptionContent } from '@lib/ui/inputs/dropdown/DropdownOptionContent'
import { useAssets } from '../state/assets'
import { Asset } from '../../chain/Asset'
import { TokenIcon } from '@web3icons/react'
import { useAsset } from '../state/asset'

export function ManageAsset() {
  const [asset, setAsset] = useAsset()
  const assets = useAssets()

  return (
    <SelectOptionInput<Asset>
      label="Asset"
      value={asset}
      onChange={setAsset}
      options={assets}
      getOptionKey={(asset) => asset.address || 'native'}
      renderOption={(asset) => (
        <DropdownOptionContent
          identifier={
            <TokenIcon
              key={`${asset.chainId}-${asset.symbol}`}
              symbol={asset.symbol}
              variant="branded"
            />
          }
          name={asset.symbol}
        />
      )}
      valueIdentifier={
        <TokenIcon
          key={`${asset.chainId}-${asset.symbol}`}
          symbol={asset.symbol}
          variant="branded"
        />
      }
      valueName={asset.symbol}
    />
  )
}
