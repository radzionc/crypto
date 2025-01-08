import { SelectOptionInput } from '@lib/ui/inputs/dropdown/DropdownInput'
import { chains, getChain } from '../core/chains'
import { DropdownOptionContent } from '@lib/ui/inputs/dropdown/DropdownOptionContent'
import { NetworkIcon } from '@web3icons/react'
import { useSourceChainId } from '../state/sourceChainId'

export function ManageChain() {
  const [sourceChainId, setSourceChainId] = useSourceChainId()
  const chain = getChain(sourceChainId)

  return (
    <SelectOptionInput
      label="Chain"
      value={sourceChainId}
      onChange={(id) => setSourceChainId(id)}
      options={chains.map((chain) => chain.id)}
      getOptionKey={(id) => getChain(id).name}
      renderOption={(id) => (
        <DropdownOptionContent
          identifier={<NetworkIcon chainId={id} variant="branded" />}
          name={getChain(id).name}
        />
      )}
      valueIdentifier={
        <NetworkIcon
          key={sourceChainId}
          chainId={sourceChainId}
          variant="branded"
        />
      }
      valueName={chain.name}
    />
  )
}
