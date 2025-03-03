import { useTransformQueryData } from '@lib/ui/query/hooks/useTransformQueryData'
import { useCallback } from 'react'

import {
  defaultFeePriority,
  FeePriority,
} from '../maxPriorityFeePerGas/core/FeePriority'

import { usePriorityFeesQuery } from './usePriorityFeesQuery'

export const usePriorityFeeQuery = (
  priority: FeePriority = defaultFeePriority,
) => {
  const query = usePriorityFeesQuery()

  return useTransformQueryData(
    query,
    useCallback((result) => result[priority], [priority]),
  )
}
