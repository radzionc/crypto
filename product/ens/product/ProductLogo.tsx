import { MapPinIcon } from '@lib/ui/icons/MapPinIcon'
import { Text } from '@lib/ui/text'

import { productName } from './config'

export const ProductLogo = () => (
  <Text centerVertically={{ gap: 8 }} color="contrast" size={22} weight={600}>
    <MapPinIcon />
    {productName}
  </Text>
)
