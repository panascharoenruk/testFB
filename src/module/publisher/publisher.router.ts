import { Router } from 'express'
import * as publisherController from './publisher.controller'
import { z } from 'zod'
import { validatorInput } from '../../middleware/validatorInput'
import { isLoggedIn } from '../../middleware/auth'
import passport from 'passport'
//passport.js token ส่ง id
export const publisherSchema = z.object({
  email: z.string(),
  name: z.string()
})

const router = Router()

router.get('/', publisherController.getAllPublishers)
router.post('/', validatorInput(publisherSchema), publisherController.createPublisher)
router.put('/:id', passport.authenticate('jwt', {session: false}), publisherController.updatePublisher)
router.delete('/:id', passport.authenticate('jwt', {session: false}), publisherController.deletePublisher)
router.put('/game/:id', passport.authenticate('jwt', {session: false}), publisherController.publisherAddGame)
export default router
