import { match } from '@lib/utils/match'
import { DefaultTheme } from 'styled-components'

import { FeePriority } from '../core/FeePriority'

export const getFeePriorityColor = (
  { colors }: DefaultTheme,
  priority: FeePriority,
) =>
  match(priority, {
    low: () => colors.alert,
    medium: () => colors.idle,
    high: () => colors.success,
  })
