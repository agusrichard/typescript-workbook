import { Request, Response, NextFunction } from 'express'

import { verifyToken } from '../utils'

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token: string = req.headers.authorization || ''

    if (!token.startsWith('Bearer')) {
      res.json({
        error: 'Invalid token',
      })
      return
    }

    res.locals.userData = verifyToken(token.slice(7))
    next()
  } catch (error) {
    res.json({
      error: 'Unauthorized',
    })
  }
}

export const adminOnlyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { role } = res.locals.userData
    if (role !== 1) {
      res.json({ error: 'You are not allowed to do this action' })
      return
    }
    next()
  } catch (error) {
    res.json({ error })
  }
}

export default authMiddleware
