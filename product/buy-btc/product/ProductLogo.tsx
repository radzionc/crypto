import { Text } from '@lib/ui/text'
import { BitcoinIcon } from '@lib/ui/icons/BitcoinIcon'
import { productName } from './config'

export const ProductLogo = () => (
  <Text centerVertically={{ gap: 8 }} color="contrast" size={22} weight={600}>
    <BitcoinIcon />
    {productName}
  </Text>
)
