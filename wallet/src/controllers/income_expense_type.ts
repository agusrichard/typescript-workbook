import _ from 'lodash'
import { Request, Response } from 'express'

import { IncomeExpenseTypeModel, IncomeExpenseType } from '../models'
import {
  ResponseTemplate,
} from '../utils'

export interface IncomeExpenseTypeController {
  create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  findByUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
  delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>
}

const initializeIncomeExpenseTypeController = (incomeExpenseTypeModel: IncomeExpenseTypeModel): IncomeExpenseTypeController => ({
  create: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { id } = res.locals.userData
      const input: IncomeExpenseType = { ...req.body, userID: id }
      const found = await incomeExpenseTypeModel.findByDescriptionAndUserID(input)
      if (!_.isEmpty(found)) {
        return ResponseTemplate.badRequestError(res, 'It has been created')
      }
      const result = await incomeExpenseTypeModel.create(input)
      return ResponseTemplate.successResponse(res, 'Success to create income expense type', result)
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
  findByUser: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { id } = res.locals.userData
      const result = await incomeExpenseTypeModel.findByUser(id)
      return ResponseTemplate.successResponse(res, 'Success to find income expense type', result)
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
  update: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const input: IncomeExpenseType = { ...req.body }
      const result = await incomeExpenseTypeModel.update(input)
      return ResponseTemplate.successResponse(res, 'Success to update income expense type', result)
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
  delete: async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const id = parseInt(req.params.id, 10)
      const result = await incomeExpenseTypeModel.delete(id)
      return ResponseTemplate.successResponse(res, 'Success to delete income expense type', result)
    } catch (error) {
      return ResponseTemplate.internalServerError(res)
    }
  },
})

export default initializeIncomeExpenseTypeController
