import { SelectOptionInput } from '@lib/ui/inputs/dropdown/DropdownInput'
import { chains, getChain } from '../../chain/config'
import { DropdownOptionContent } from '@lib/ui/inputs/dropdown/DropdownOptionContent'
import { NetworkIcon } from '@web3icons/react'
import { useChainId } from '../state/chainId'

export function ManageChain() {
  const [chainId, setChainId] = useChainId()
  const chain = getChain(chainId)

  return (
    <SelectOptionInput
      label="Network"
      value={chainId}
      onChange={(id) => setChainId(id)}
      options={chains.map((chain) => chain.id)}
      getOptionKey={(id) => getChain(id).name}
      renderOption={(id) => (
        <DropdownOptionContent
          identifier={<NetworkIcon chainId={id} variant="branded" />}
          name={getChain(id).name}
        />
      )}
      valueIdentifier={
        <NetworkIcon key={chainId} chainId={chainId} variant="branded" />
      }
      valueName={chain.name}
    />
  )
}
