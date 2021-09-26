import { Request, Response } from 'express'

import { UsersModel } from '../models'
import { ResponseTemplate } from '../utils'

export interface UsersController {
  login: (req: Request, res: Response) => void
  register: (req: Request, res: Response) => void
  profile: (req: Request, res: Response) => void
}

type Initializer = (usersModel: UsersModel) => UsersController

const initializeUsersController: Initializer = (usersModel: UsersModel) : UsersController => ({
  login: (req: Request, res: Response) => {
    res.json({ message: 'Login' })
  },
  register: async (req: Request, res: Response) => {
    try {
      const user: UsersModel = { ...req.body }
      const newUser: UsersModel = await usersModel.register(user)
      return ResponseTemplate.successResponse(res, 'Success to register user', newUser)
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
  profile: (req: Request, res: Response) => {
    res.json({ message: 'Profile' })
  },
})

export default initializeUsersController
