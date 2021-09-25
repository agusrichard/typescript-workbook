import { Router } from 'express'

import { UsersController } from '../controllers'

const initializeUsersRouter = (usersController: UsersController): Router => {
  const router: Router = Router()

  router.post('/login', usersController.login)
  router.post('/register', usersController.register)

  return router
}

export default initializeUsersRouter
