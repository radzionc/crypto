import { useTransformQueryData } from '@lib/ui/query/hooks/useTransformQueryData'
import {
  defaultFeePriority,
  FeePriority,
} from '../maxPriorityFeePerGas/core/FeePriority'
import { useCallback } from 'react'
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
