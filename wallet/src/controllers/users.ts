import { Request, Response } from 'express'

import { UsersModel } from '../models'

export interface UsersController {
  login: (req: Request, res: Response) => void
  register: (req: Request, res: Response) => void
}

type Initializer = (usersModel: UsersModel) => UsersController

const initializeUsersController: Initializer = (usersModel: UsersModel) : UsersController => {
  return {
    login: (req: Request, res: Response) => {
      res.json({ message: 'Login' })
    },
    register: (req: Request, res: Response) => {
      res.json({ message: 'Register' })
    }
  }
}

export default initializeUsersController