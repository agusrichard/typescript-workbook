import { Router, Request, Response } from 'express'

import { IAuthService } from '../services'
import {
  LoginUserRequestDTO,
  RegisterUserRequestDTO,
} from '../dtos'

const createAuthHandler = (service: IAuthService): Router => {
  const r = Router()

  r.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
      const user: RegisterUserRequestDTO = {
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
      }
      const result = await service.register(user)
      res.json({
        success: true,
        data: result,
      })
    } catch (error: any) {
      res.json({
        error: error.message,
      })
    }
  })

  r.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
      const user: LoginUserRequestDTO = {
        email: req.body.email,
        password: req.body.password,
      }
      const result = await service.login(user)
      res.json({
        success: true,
        data: result,
      })
    } catch (error: any) {
      res.json({
        error: error.message,
      })
    }
  })

  return r
}

export default createAuthHandler
