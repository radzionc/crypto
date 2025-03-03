import { ChartCandleStickIcon } from '@lib/ui/icons/ChartCandleStickIcon'
import { Text } from '@lib/ui/text'

export const ProductLogo = () => (
  <Text centerVertically={{ gap: 8 }} color="contrast" size={22} weight={600}>
    <ChartCandleStickIcon />
    Trading History
  </Text>
)
