import { Router } from 'express'
import * as publisherController from './publisher.controller'
import { z } from 'zod'
import { validatorInput } from '../../middleware/validatorInput'
import { isLoggedIn } from '../../middleware/auth'
//passport.js token ส่ง id
export const publisherSchema = z.object({
  email: z.string(),
  name: z.string()
})

const router = Router()

router.get('/', publisherController.getAllPublishers)
router.post('/', validatorInput(publisherSchema), publisherController.createPublisher)
router.put('/:id', isLoggedIn, publisherController.updatePublisher)
router.delete('/:id', isLoggedIn, publisherController.deletePublisher)
router.put('/game/:id', isLoggedIn, publisherController.publisherAddGame)
export default router
