import { Router, Request, Response } from 'express'
import { User } from '../repositories'

import { adminOnlyMiddleware } from '../middlewares'

import { IUserService } from '../services'

const createUserRouter = (service: IUserService) => {
  const r = Router()

  r.post('/create', adminOnlyMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
      const user: User = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        fullname: req.body.fullname,
      }
      const result = await service.create(user)
      res.json({
        success: true,
        data: result,
      })
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      })
    }
  })

  r.get('/profile', async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(res.locals.userData.id)
      const result = await service.findById(id)
      res.json({
        success: true,
        data: result,
      })
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      })
    }
  })

  r.get('/find-all', adminOnlyMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
      const skip = parseInt(String(req.query.skip), 10)
      const take = parseInt(String(req.query.take), 10)
      const result = await service.findAll(skip, take)
      res.json({
        success: true,
        data: result,
      })
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      })
    }
  })

  r.put('/update', adminOnlyMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
      const user: User = {
        id: String(req.body.id),
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        fullname: req.body.fullname,
      }
      const result = await service.update(user)
      res.json({
        success: true,
        data: result,
      })
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      })
    }
  })

  r.delete('/delete', adminOnlyMiddleware, async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.query.id)
      const result = await service.delete(id)
      res.json({
        success: true,
        data: result,
      })
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      })
    }
  })

  return r
}

export default createUserRouter
