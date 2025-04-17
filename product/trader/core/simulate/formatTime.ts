import { Milliseconds } from '@lib/utils/time/types'

export const formatTime = (timestamp: Milliseconds) => {
  const date = new Date(timestamp)

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
