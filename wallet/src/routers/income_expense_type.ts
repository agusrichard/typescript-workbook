import { Router } from 'express'
import { AuthMiddleware } from '../middlewares'
import { IncomeExpenseTypeController } from '../controllers'

const initializeIncomeExpenseTypeRouter = (incomeExpenseTypeController: IncomeExpenseTypeController, authMiddleWare: AuthMiddleware): Router => {
  const router: Router = Router()

  router.post('/create', authMiddleWare.authenticate, incomeExpenseTypeController.create)
  router.get('/find-by-user', authMiddleWare.authenticate, incomeExpenseTypeController.findByUser)
  router.put('/update', authMiddleWare.authenticate, incomeExpenseTypeController.update)
  router.delete('/delete/:id', authMiddleWare.authenticate, incomeExpenseTypeController.delete)

  return router
}

export default initializeIncomeExpenseTypeRouter
