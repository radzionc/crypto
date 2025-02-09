export const feePriorities = ['low', 'medium', 'high'] as const

export type FeePriority = (typeof feePriorities)[number]

export const feePriorityPercentiles: Record<FeePriority, number> = {
  low: 10,
  medium: 50,
  high: 90,
}
