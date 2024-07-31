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

router.get('/', userController.getAllUsers)
router.post('/', validatorInput(userSchema), userController.createUser)
router.put('/:id', userController.updateUser)
router.put('/game/:id', userController.userAddGame)
router.delete('/:id', userController.deleteUser)
router.post('/login', userController.userLogin);
router.post('/logout', userController.userLogOut);
export default router
