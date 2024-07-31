import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PrismaHelper } from '../../utils'
import { newReview } from './review.logic'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
const prisma = new PrismaClient()

const db = prisma.review

export async function getAllReviews(req: Request, res: Response) {
  try {
    const data = await prisma.review.findMany()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error', error })
  }
}

export async function createReview(req: Request, res: Response) {
  try {
    const checkGame = await prisma.game.findUnique({
      where: {
        id: req.body.gameId,
      }
    })

    const checkUser = await prisma.user.findUnique({
      where: {
        id: req.body.userId,
      }
    })

    if (!checkGame) {
      res.status(400).json({ message: 'Game Not Found' })
      return
    }
    if (!checkUser) {
      res.status(400).json({ message: 'User Not Found' })
      return
    }
    const data = await db.create({
      data: {
        ...req.body
      }
    })
    res.status(200).json({ message: 'Review Created', data })
  } catch (error) {
    res.status(400).json({ message: 'create fail', error })
  }
}

export async function updateReview(req: Request, res: Response) {
  try {
    const checkTime = dayjs().subtract(24, 'hour');
    if(checkTime.isSameOrAfter(req.body.createdAt)){
      res.status(404).json({ message: 'You couldn\'t edit your review after 24 hours' })
      return
    }

    const review = await prisma.review.findUnique({
      where: {
        id: req.params.id
      }
    })
    if (!review) {
      res.status(404).json({ message: 'Not Found' })
      return
    }
    
    await prisma.review.update({
      where: {
        id: req.params.id
      },
      data: {
        ...req.body
      }
    })
    res.status(200).json({ message: 'review Updated' })
  } catch (error) {
    res.status(400).json({ message: 'error', error })
  }
}

export async function deleteReview(req: Request, res: Response) {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: req.params.id
      }
    })
    if (!review) {
      res.status(404).json({ message: 'Not Found' })
      return
    }
    await prisma.review.delete({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({ message: 'review Deleted' })
  } catch (error) {
    res.status(400).json({ message: 'error', error })
  }
}
