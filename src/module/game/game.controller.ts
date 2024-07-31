import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { PrismaHelper } from '../../utils'
import { newGame } from './game.logic'

const prisma = new PrismaClient()

const db = prisma.game


export async function getAllGames(req: Request, res: Response) {
    try {
        const data = await prisma.game.findMany({
          where: {
            active: true, //only avilable game
          },
          include:{
            publisher: true, 
          }
        })
        res.status(200).json({ data })
    } catch (error) {
        res.status(400).json({ message: 'error', error })
    }
}

export async function getGamesByPublisherId(req: Request, res: Response) {
  try {
    const publisher = await prisma.game.findMany({
      where: {
        publisherId: req.params.id
      }
    })

    if (!publisher) {
      res.status(404).json({ message: 'Not found' })
      return
    }
      res.status(200).json({ data: publisher })
  } catch (error) {
      res.status(400).json({ message: 'error', error })
  }
}

export async function createGame(req: Request, res: Response) {
    try {
      const checkPublisher = await prisma.publisher.findUnique({
        where: {
          id: req.body.publisherId,
        }
      })
      if(!checkPublisher){
        res.status(400).json({ message: 'Publisher Not Found'})
        return
      }
        const data = await db.create({
            
            data: {
                ...req.body
            }
        })
        console.log(data);
        res.status(200).json({ message: 'Game Created', data })
    } catch (error) {
        res.status(400).json({ message: 'create fail', error })
    }
}

export async function updateGame(req: Request, res: Response) {
    try {
      const game = await prisma.game.findUnique({
        where: {
          id: req.params.id
        }
      })
      if (!game) {
        res.status(404).json({ message: 'Not Found' })
        return
      }
      await prisma.game.update({
        where: {
          id: req.params.id
        },
        data: {
          ...req.body
        }
      })
      res.status(200).json({ message: 'game Updated' })
    } catch (error) {
      res.status(400).json({ message: 'error', error })
    }
  }

  export async function deleteGame(req: Request, res: Response) {
    try {
      const game = await prisma.game.findUnique({
        where: {
          id: req.params.id
        }
      })
      if (!game) {
        res.status(404).json({ message: 'Not Found' })
        return
      }
      await prisma.game.delete({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({ message: 'game Deleted' })
    } catch (error) {
      res.status(400).json({ message: 'error', error })
    }
  }

  export async function changePublisher(req: Request, res: Response) {
    try {
      const game = await prisma.game.findUnique({
        where: {
          id: req.params.id,
        }
      })
      const newPublisher = await prisma.publisher.findUnique({
        where: {
          id: req.body.publisherId,
        }
      })
      if (!game) {
        res.status(404).json({ message: 'Game Not Found' })
        return
      }
      if (!newPublisher) {
        res.status(404).json({ message: 'New Publisher Not Found' })
        return
      }
      game.history.push(game.publisherId);
      await prisma.game.update({
        where: {
          id: req.params.id,
        },
        data: {
          ...req.body,
        }
      })
      await prisma.game.update({
        where: {
          id: req.params.id,
        },
        data: {
          history: game.history,
        }
      })
      
      res.status(200).json({ message: 'game Updated' })
    } catch (error) {
      res.status(400).json({ message: 'error', error })
    }
  }