import { Prisma, PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { PrismaHelper } from '../../utils'
import passport from 'passport';
import jwt from 'jsonwebtoken'
import '../../configs/passport'
const prisma = new PrismaClient()

const db = prisma.user


export async function getAllUsers(req: Request, res: Response) {
  try {
    const data = await prisma.user.findMany()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error', error })
  }
}
export async function userLogin(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
    try {
      if (err) return next(err)
      console.log(user);
      if (user) {
        const token = jwt.sign(user, 'yWnVtr8B8u')
        return res.json({ user, token })
      } else {
        return res.status(422).json(info)
      }
    } catch (error) {
      console.log(error)
    }
  })(req, res, next);
}

export async function createUser(req: Request, res: Response) {
  try {
    const data = await db.create({

      data: {
        ...req.body
      }
    })
    res.status(200).json({ message: 'User Created', data })
  } catch (error) {
    res.status(400).json({ message: 'create fail', error })
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    })
    if (!user) {
      res.status(404).json({ message: 'Not Found' })
      return
    }
    await prisma.user.update({
      where: {
        id: req.params.id
      },
      data: {
        ...req.body
      }
    })
    res.status(200).json({ message: 'user Updated' })
  } catch (error) {
    res.status(400).json({ message: 'error', error })
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    })
    if (!user) {
      res.status(404).json({ message: 'Not Found' })
      return
    }
    await prisma.user.delete({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({ message: 'user Deleted' })
  } catch (error) {
    res.status(400).json({ message: 'error', error })
  }
}

export async function userAddGame(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    })

    const game = await prisma.game.findMany({
      where: {
        id: {
          in: req.body.gameIds
        }
      }
    })

    console.log(game);
    if (!user) {
      res.status(404).json({ message: 'user is not found' })
      return
    }
    if (!game) {
      console.log("Game is not found");
      res.status(404).json({ message: 'game is not found' })
      return
    }

    const result = await prisma.user.update({
      where: {
        id: req.params.id
      },
      data: {
        gameId: {
          push: req.body.gameId
        }
      }
    })
    console.log(result)
    res.status(200).json({ message: 'successful update game into user' })
  } catch (error) {
    res.status(400).json({ message: 'error', error })
  }
}
