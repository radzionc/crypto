import { VStack } from '@lib/ui/css/stack'
import { Text } from '../text'
import { ComponentWithChildrenProps, TitledComponentProps } from '../props'

export const TitledSection = ({
  title,
  children,
}: TitledComponentProps & ComponentWithChildrenProps) => (
  <VStack fullWidth gap={16}>
    <Text as="div" size={16} weight="600" color="contrast">
      {title}
    </Text>
    {children}
  </VStack>
)
