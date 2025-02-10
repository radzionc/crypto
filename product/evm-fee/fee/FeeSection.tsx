import { VStack } from '@lib/ui/css/stack'
import { ChildrenProp, TitleProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'

export const FeeSection = ({ title, children }: ChildrenProp & TitleProp) => {
  return (
    <VStack gap={24}>
      <Text size={18} color="primary" weight="700">
        {title}
      </Text>
      {children}
    </VStack>
  )
}
