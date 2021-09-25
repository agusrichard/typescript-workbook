
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { ConfigType } from '../configs'
import { ResponseTemplate } from '../utils'


export interface AuthMiddleware {
  authenticate: (req: Request, res: Response, next: NextFunction) => void
}


const initializeAuthMiddleware = (configs: ConfigType) => {
  return {
    authenticate: (req: Request, res: Response, next: NextFunction) => {
      const token: string = req.headers.authorization || ''
  
      if (!token.startsWith('Bearer')) {
          return ResponseTemplate.unauthorizedError(res)
      }
  
      res.locals.userData = jwt.verify(token, configs.SECRET_KEY)
      next()
    }
  }
}

export default initializeAuthMiddleware