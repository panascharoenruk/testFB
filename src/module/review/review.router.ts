import { Router } from 'express'
import * as reviewController from './review.controller'
import { z } from 'zod'
import { validatorInput } from '../../middleware/validatorInput'
import { Rating } from '@prisma/client'
import dayjs from 'dayjs'
//เพิ่่มเงื่อนไขระยะเวลาการแก้ไข review
export const reviewSchema = z.object({
  rating: z.nativeEnum(Rating),
  comment: z.string(),
  gameId: z.string(),
  userId: z.string(),
})

const router = Router()

router.get('/', reviewController.getAllReviews)
router.post('/', validatorInput(reviewSchema), reviewController.createReview)
router.put('/:id', reviewController.updateReview)
router.delete('/:id', reviewController.deleteReview)
export default router
