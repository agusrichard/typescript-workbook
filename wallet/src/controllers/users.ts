import _ from 'lodash'
import { Request, Response } from 'express'

import { UsersModel, User } from '../models'
import {
  generateToken,
  comparePassword,
  ResponseTemplate,
  generatePassword,
} from '../utils'

export interface UsersController {
  register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  profile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  clear: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
}

type Initializer = (usersModel: UsersModel) => UsersController

const initializeUsersController: Initializer = (usersModel: UsersModel) : UsersController => ({
  register: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userFound = await usersModel.findByEmail(req.body.email)
      if (!_.isEmpty(userFound)) {
        return ResponseTemplate.badRequestError(res, 'User has been registered')
      }

      const hashedPassword = await generatePassword(req.body.password)
      const user: User = { ...req.body, password: hashedPassword }
      const newUser: User = await usersModel.create(user)
      return ResponseTemplate.successResponse(res, 'Success to register user', newUser)
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
  login: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userFound = await usersModel.findByEmail(req.body.email)
      if (!userFound) {
        return ResponseTemplate.badRequestError(res, 'Wrong email or password')
      }

      const isPasswordValid = await comparePassword(req.body.password, userFound.password)
      if (!isPasswordValid) {
        return ResponseTemplate.badRequestError(res, 'Wrong email or password')
      }

      const token = generateToken({ id: userFound.id })
      const userWithToken = { ...userFound, token }

      return ResponseTemplate.successResponse(res, 'Success to login user', { ...userWithToken, password: undefined })
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
  profile: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { id } = res.locals.userData
      const user: User = await usersModel.findById(id)
      return ResponseTemplate.successResponse(res, 'Success to get user profile', { ...user, password: undefined })
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
  clear: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      await usersModel.clear()
      return ResponseTemplate.successResponse(res, 'Success to clear all injected daa')
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
})

export default initializeUsersController
