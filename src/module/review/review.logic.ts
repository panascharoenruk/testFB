import { z } from 'zod'
import { reviewSchema } from './review.router'

type reviewScheme = z.infer<typeof reviewSchema>

export function newReview(data: reviewScheme) {
  return reviewSchema.parse(data)
}
