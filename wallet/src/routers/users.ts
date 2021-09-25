import { Router } from 'express'

import { AuthMiddleware } from '../middlewares'
import { UsersController } from '../controllers'

const initializeUsersRouter = (usersController: UsersController, authMiddleWare: AuthMiddleware): Router => {
  const router: Router = Router()

  router.post('/login', usersController.login)
  router.post('/register', usersController.register)
  router.get('/profile', authMiddleWare.authenticate, usersController.profile)

  return router
}

export default initializeUsersRouter
