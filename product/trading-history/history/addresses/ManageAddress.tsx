import { IconButton } from '@lib/ui/buttons/IconButton'
import { HStack } from '@lib/ui/css/stack'
import { AsteriskIcon } from '@lib/ui/icons/AsteriskIcon'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { range } from '@lib/utils/array/range'
import { without } from '@lib/utils/array/without'

import { useAddresses } from '../state/addresses'

import { useAreAddressesVisible } from './state/areAddressesVisible'

export const ManageAddress = ({ value }: ValueProp<string>) => {
  const [, setItems] = useAddresses()
  const [isVisible] = useAreAddressesVisible()

  return (
    <HStack
      fullWidth
      alignItems="center"
      justifyContent="space-between"
      gap={8}
    >
      <Text cropped color="supporting">
        {isVisible
          ? value
          : range(value.length).map((key) => (
              <AsteriskIcon style={{ flexShrink: 0 }} key={key} />
            ))}
      </Text>
      <IconButton
        kind="secondary"
        size="l"
        title="Remove address"
        onClick={() => setItems((items) => without(items, value))}
        icon={<TrashBinIcon />}
      />
    </HStack>
  )
}
