import { Router } from 'express'
import * as gameController from './game.controller'
import { z } from 'zod'
import { validatorInput } from '../../middleware/validatorInput'
import { Genres } from '@prisma/client'
//ประวัติการโอนเกมของ publisher
export const gameSchema = z.object({
  title: z.string(),
  description: z.string(),
  publisherId: z.string(),
  active: z.boolean(),
  genres: z.nativeEnum(Genres),
})

const router = Router()

router.get('/', gameController.getAllGames)
router.get('/:id', gameController.getGamesByPublisherId)
router.post('/', validatorInput(gameSchema), gameController.createGame)
router.put('/:id', gameController.updateGame)
router.put('/publisher/:id', gameController.changePublisher)
router.delete('/:id', gameController.deleteGame)
export default router
