import { Request, Response } from 'express'

import { ResponseTemplate } from '../utils'
import { IncomeExpense, IncomeExpenseModel } from '../models'

export interface IncomeExpenseController {
  create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
}

const initializeIncomeExpenseContoller = (incomeExpenseModel: IncomeExpenseModel): IncomeExpenseController => ({
  create: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userID = parseInt(res.locals.userData.id, 10)
      const input: IncomeExpense = { ...req.body, user_id: userID }
      const result = await incomeExpenseModel.create(input)
      return ResponseTemplate.successResponse(res, 'Success to create income expense', result)
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
})

export default initializeIncomeExpenseContoller
