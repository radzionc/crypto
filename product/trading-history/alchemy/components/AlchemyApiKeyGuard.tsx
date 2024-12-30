import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useAlchemyApiKey } from '../state/alchemyApiKey'
import { SetAlchemyApiKey } from './SetAlchemyApiKey'

export const AlchemyApiKeyGuard = ({
  children,
}: ComponentWithChildrenProps) => {
  const [value] = useAlchemyApiKey()

  if (!value) {
    return <SetAlchemyApiKey />
  }

  return <>{children}</>
}
