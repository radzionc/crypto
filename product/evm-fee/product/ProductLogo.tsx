import { Text } from '@lib/ui/text'
import { FuelIcon } from '@lib/ui/icons/FuelIcon'

export const ProductLogo = () => (
  <Text centerVertically={{ gap: 8 }} color="contrast" size={22} weight={600}>
    <FuelIcon />
    Ethereum Fees
  </Text>
)
