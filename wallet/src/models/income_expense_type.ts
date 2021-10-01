import { Pool } from 'pg'

export interface IncomeExpenseType {
  id?: number,
  description?: string,
  userID?: number,
  isDeleted?: boolean
  deletedAt: Date
}

export interface IncomeExpenseTypeModel {
  create: (incomeExpenseType: IncomeExpenseType) => Promise<IncomeExpenseType>
  findByUser: (userID: number) => Promise<Array<IncomeExpenseType>>
  findByDescriptionAndUserID: (incomeExpenseType: IncomeExpenseType) => Promise<IncomeExpenseType>
  update: (incomeExpenseType: IncomeExpenseType) => Promise<IncomeExpenseType>
  delete: (id: number) => Promise<IncomeExpenseType>
}

const initilizeIncomeExpenseTypeModel = (db: Pool): IncomeExpenseTypeModel => ({
  create: async (incomeExpenseType: IncomeExpenseType) => {
    try {
      const query = `
        INSERT INTO income_expense_type (
          description,
          user_id
        )
        VALUES (
          $1,
          $2
        )
        RETURNING id;
      `

      const { rows } = await db.query(query, [incomeExpenseType.description, incomeExpenseType.userID])
      const result: IncomeExpenseType = { ...rows[0] }
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  findByUser: async (userID: number) => {
    try {
      const query = `
        SELECT *
        FROM income_expense_type
        WHERE user_id = $1 AND is_deleted=FALSE AND deleted_at IS NULL;
      `

      const { rows } = await db.query(query, [userID])
      const result: Array<IncomeExpenseType> = rows
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  findByDescriptionAndUserID: async (incomeExpenseType: IncomeExpenseType) => {
    try {
      const query = `
        SELECT *
        FROM income_expense_type
        WHERE description=$1 AND user_id=$2 AND is_deleted=FALSE AND deleted_at IS NULL;
      `

      const { rows } = await db.query(query, [incomeExpenseType.description, incomeExpenseType.userID])
      const result: IncomeExpenseType = { ...rows[0] }
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  update: async (incomeExpenseType: IncomeExpenseType) => {
    try {
      const query = `
        UPDATE income_expense_type
        SET 
          description=$1
        WHERE id=$2
        RETURNING id;
      `

      const { rows } = await db.query(query, [incomeExpenseType.description, incomeExpenseType.id])
      const result: IncomeExpenseType = { ...rows[0] }
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  delete: async (id: number) => {
    try {
      const query = `
        UPDATE income_expense_type
        SET 
          is_deleted=TRUE,
          deleted_at=now()
        WHERE id=$1
        RETURNING id;
      `

      const { rows } = await db.query(query, [id])
      const result: IncomeExpenseType = { ...rows[0] }
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
})

export default initilizeIncomeExpenseTypeModel
