import express, { Application, NextFunction, Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import dayjs from 'dayjs'
import publisherRouter from './module/publisher/publisher.router'
import gameRouter from './module/game/game.router'
import userRouter from './module/user/user.router'
import reviewRouter from './module/review/review.router'
import { Strategy as LocalStrategy } from 'passport-local';
import './configs/passport'
const PORT = 8080

const app: Application = express()

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())

const prisma = new PrismaClient()
const db = prisma.user

app.use('/api/publisher', publisherRouter)
app.use('/api/game', gameRouter)
app.use('/api/user', userRouter)
app.use('/api/review', reviewRouter)


app.get('/test', (req: Request, res: Response) => {
  var now = dayjs().format()
  console.log(now)
  res.send('Hello World!')
}) 

app.listen(PORT, () => {
  console.log(`Core API is running on ${PORT}`)
})
