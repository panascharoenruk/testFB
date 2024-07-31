import { Request, Response, NextFunction } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(404).json({ message: 'Log in first' })
}
export function isLoggedOut(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.status(404).json({ message: 'still login' })
} 
