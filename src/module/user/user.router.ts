import { Router } from 'express'
import * as userController from './user.controller'
import { z } from 'zod'
import { validatorInput } from '../../middleware/validatorInput'
import passport from 'passport';


export const userSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string()
})

const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), userController.getAllUsers)
router.post('/', validatorInput(userSchema), userController.createUser)
router.put('/:id', passport.authenticate('jwt', { session: false }), userController.updateUser)
router.put('/game/:id', passport.authenticate('jwt', { session: false }), userController.userAddGame)
router.delete('/:id', passport.authenticate('jwt', { session: false }), userController.deleteUser)
router.post('/login', userController.userLogin);
export default router
