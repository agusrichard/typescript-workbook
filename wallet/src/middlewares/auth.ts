import { Request, Response, NextFunction } from 'express'

import { ResponseTemplate, verifyToken } from '../utils'

export interface AuthMiddleware {
  authenticate: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>
}

const initializeAuthMiddleware = (): AuthMiddleware => ({
  authenticate: (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> => {
    try {
      const token: string = req.headers.authorization || ''

      if (!token.startsWith('Bearer')) {
        return ResponseTemplate.unauthorizedError(res)
      }

      console.log('token.slice(7)', token.slice(7))

      res.locals.userData = verifyToken(token.slice(7))
      next()
      return null
    } catch (error) {
      return ResponseTemplate.unauthorizedError(res)
    }
  },
})

export default initializeAuthMiddleware
