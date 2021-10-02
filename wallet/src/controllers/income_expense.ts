import { Request, Response } from 'express'

import { ResponseTemplate } from '../utils'
import { IncomeExpense, IncomeExpenseModel } from '../models'

export interface IncomeExpenseController {
  create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  findByUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
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
  findByUser: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userID = parseInt(res.locals.userData.id, 10)
      const result = await incomeExpenseModel.findByUser(userID)
      return ResponseTemplate.successResponse(res, 'Success to get all income expense by user', result)
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
  update: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const input: IncomeExpense = { ...req.body }
      const result = await incomeExpenseModel.update(input)
      return ResponseTemplate.successResponse(res, 'Success to update income expense', result)
    } catch (error) {
      console.log('error', error)
      return ResponseTemplate.internalServerError(res)
    }
  },
  delete: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const id = parseInt(req.params.id, 10)
      const result = await incomeExpenseModel.delete(id)
      return ResponseTemplate.successResponse(res, 'Success to delete income expense', result)
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
})

export default initializeIncomeExpenseContoller
