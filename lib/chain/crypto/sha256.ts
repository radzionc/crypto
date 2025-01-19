import { createHash } from 'crypto'

export const sha256 = (data: string): string =>
  createHash('sha256').update(data).digest('hex')
