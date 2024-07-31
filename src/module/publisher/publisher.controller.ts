import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PrismaHelper } from '../../utils'
import { newPublisher } from './publisher.logic'
import { update } from 'lodash'

const prisma = new PrismaClient()

const db = prisma.publisher

const query = (req: Request) => {

}
//prepared for passportjs
export async function register(req: Request, res: Response) {
  const data = await db.create({
    data: {
      ...req.body
    }
  })
}
export async function getAllPublishers(req: Request, res: Response) {
  try {
    const data = await prisma.publisher.findMany({
      include: {
        publishedGames: {
          where: {
            active: true,
          },
        },
      },
    })
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'error', error })
  }
}

export async function createPublisher(req: Request, res: Response) {
  try {
    
    const data = await db.create({
      data: {
        ...req.body
      }
    })
    res.status(200).json({ message: 'Publisher Created', data })
  } catch (error) {
    res.status(400).json({ message: 'create fail', error })
  }
}

export async function updatePublisher(req: Request, res: Response) {
  try {
    const publisher = await prisma.publisher.findUnique({
      where: {
        id: req.params.id
      }
    })
    if (typeof req.body.name != 'string') {
      res.status(404).json({ message: 'Name is string' })
      return
    }

    if (!publisher) {
      res.status(404).json({ message: 'Publisher Not Found' })  
      return
    }
    await prisma.publisher.update({
      where: {
        id: req.params.id
      },
      data: {
        ...req.body
      },
      include: {
        publishedGames: true,
      }
    })
    res.status(200).json({ message: 'publisher Updated' })
  } catch (error) {
    res.status(400).json({ message: 'error', error })
  }
}

export async function deletePublisher(req: Request, res: Response) {
  try {
    const publisher = await prisma.publisher.findUnique({
      where: {
        id: req.params.id
      }
    })
    if (!publisher) {
      res.status(404).json({ message: 'Not Found' })
      return
    }
    await prisma.publisher.delete({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({ message: 'publisher Deleted' })
  } catch (error) {
    res.status(400).json({ message: 'error', error })
  }
}

export async function publisherAddGame(req: Request, res: Response) {
  try {
    const publisher = await prisma.publisher.findUnique({
      where: {
        id: req.params.id,
      },
    })
    const game = await prisma.game.findMany({
      where: {
        publisherId: req.params.id
      },
      select: {
        id: true,
      }
    })
    console.log(game);
    if (!publisher) {
      res.status(404).json({ message: 'publisher is not found' })
      return
    }
    if (!game) {
      console.log("Game is not found");
      res.status(404).json({ message: 'game is not found' })
      return
    }

    const result = await prisma.publisher.update({
      where: {
        id: req.params.id,
      },
      data: {
        publishedGames: {
          connect: game
        },
      },
      include: {
        publishedGames: true,
      }
    })
    console.log(result)
    res.status(200).json({ message: 'successful update game into publisher' })
  } catch (error) {
    res.status(400).json({ message: 'error', error })
  }
}