import { Router } from 'express'

import { AuthMiddleware } from '../middlewares'
import { IncomeExpenseController } from '../controllers'

const initializeIncomeExpenseRouter = (incomeExpenseController: IncomeExpenseController, authMiddleWare: AuthMiddleware): Router => {
  const router: Router = Router()

  router.post('', authMiddleWare.authenticate, incomeExpenseController.create)
  router.get('', authMiddleWare.authenticate, incomeExpenseController.findByUser)
  router.put('', authMiddleWare.authenticate, incomeExpenseController.update)
  router.delete('/:id', authMiddleWare.authenticate, incomeExpenseController.delete)

  return router
}

export default initializeIncomeExpenseRouter
