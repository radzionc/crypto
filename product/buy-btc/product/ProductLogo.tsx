import { Text } from '@lib/ui/text'
import { ChartCandleStickIcon } from '@lib/ui/icons/ChartCandleStickIcon'

export const ProductLogo = () => (
  <Text centerVertically={{ gap: 8 }} color="contrast" size={22} weight={600}>
    <ChartCandleStickIcon />
    Buy Bitcoin
  </Text>
)
