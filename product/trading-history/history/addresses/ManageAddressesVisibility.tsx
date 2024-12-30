import { IconButton } from '@lib/ui/buttons/IconButton'
import { EyeOffIcon } from '@lib/ui/icons/EyeOffIcon'
import { EyeIcon } from '@lib/ui/icons/EyeIcon'
import { Tooltip } from '@lib/ui/tooltips/Tooltip'
import { useAreAddressesVisible } from './state/areAddressesVisible'

export const ManageAddressesVisibility = () => {
  const [value, setValue] = useAreAddressesVisible()

  const title = value ? 'Hide addresses' : 'Show addresses'

  return (
    <Tooltip
      content={title}
      renderOpener={(props) => (
        <div {...props}>
          <IconButton
            size="l"
            kind="secondary"
            title={title}
            onClick={() => setValue(!value)}
            icon={value ? <EyeIcon /> : <EyeOffIcon />}
          />
        </div>
      )}
    />
  )
}
