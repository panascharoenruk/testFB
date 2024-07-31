import { z } from 'zod'
import { publisherSchema } from './publisher.router'

type publisherScheme = z.infer<typeof publisherSchema>

export function newPublisher(data: publisherScheme) {
  return publisherSchema.parse(data)
}
