import { Router } from 'express'
import * as userController from './user.controller'
import { z } from 'zod'
import { validatorInput } from '../../middleware/validatorInput'
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';
import { isLoggedIn } from '../../middleware/auth'

export const userSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string()
})

const router = Router()

router.get('/', passport.authenticate('jwt', {session: false}), userController.getAllUsers)
router.post('/', validatorInput(userSchema), userController.createUser)
router.put('/:id', passport.authenticate('jwt', {session: false}), userController.updateUser)
router.put('/game/:id', passport.authenticate('jwt', {session: false}), userController.userAddGame)
router.delete('/:id', passport.authenticate('jwt', {session: false}), userController.deleteUser)
router.post('/login', passport.authenticate('jwt', {session: false}), userController.userLogin);
router.post('/logout', passport.authenticate('jwt', {session: false}), userController.userLogOut);
export default router
