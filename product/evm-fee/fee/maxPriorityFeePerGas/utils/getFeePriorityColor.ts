import { DefaultTheme } from 'styled-components'
import { FeePriority } from '../core/FeePriority'
import { match } from '@lib/utils/match'

export const getFeePriorityColor = (
  { colors }: DefaultTheme,
  priority: FeePriority,
) =>
  match(priority, {
    low: () => colors.alert,
    medium: () => colors.idle,
    high: () => colors.success,
  })
