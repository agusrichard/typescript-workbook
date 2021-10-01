import { Router } from 'express'

import { AuthMiddleware } from '../middlewares'
import { IncomeExpenseController } from '../controllers'

const initializeIncomeExpenseRouter = (incomeExpenseController: IncomeExpenseController, authMiddleWare: AuthMiddleware): Router => {
  const router: Router = Router()

  router.post('/create', authMiddleWare.authenticate, incomeExpenseController.create)

  return router
}

export default initializeIncomeExpenseRouter
