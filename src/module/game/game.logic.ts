import { z } from 'zod'
import { gameSchema } from './game.router'

type gameScheme = z.infer<typeof gameSchema>

export function newGame(data: gameScheme) {
  return gameSchema.parse(data)
}
