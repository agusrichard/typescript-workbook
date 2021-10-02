import { Pool } from 'pg'

export interface IncomeExpense {
  id?: number,
  value: number,
  description?: string,
  user_id?: number,
  is_deleted?: boolean,
  income_expense_type_id?: number,
  deleted_at?: Date,
  is_income?: boolean,
}

export interface IncomeExpenseModel {
  create: (incomeExpense: IncomeExpense) => Promise<IncomeExpense>
  findByUser: (user_id: number) => Promise<Array<IncomeExpense>>
  update: (incomeExpense: IncomeExpense) => Promise<IncomeExpense>
  delete: (id: number) => Promise<IncomeExpense>
}

const initializeIncomeExpenseModel = (db: Pool): IncomeExpenseModel => ({
  create: async (incomeExpense: IncomeExpense): Promise<IncomeExpense> => {
    try {
      const query = `
        INSERT INTO income_expense (
          value,
          description,
          is_income,
          user_id,
          income_expense_type_id
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5
        )
        RETURNING id;
      `

      const { rows } = await db.query(query, [
        incomeExpense.value,
        incomeExpense.description,
        incomeExpense.is_income,
        incomeExpense.user_id,
        incomeExpense.income_expense_type_id,
      ])

      const result: IncomeExpense = { ...rows[0] }
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  findByUser: async (user_id: number): Promise<Array<IncomeExpense>> => {
    try {
      const query = `
        SELECT * FROM income_expense
        WHERE user_id = $1 AND is_deleted = false;
      `

      const { rows } = await db.query(query, [user_id])

      const result: Array<IncomeExpense> = rows
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  update: async (incomeExpense: IncomeExpense): Promise<IncomeExpense> => {
    try {
      const query = `
        UPDATE income_expense
        SET
          value = $1,
          description = $2,
          income_expense_type_id = $3
        WHERE id=$4
      `

      const { rows } = await db.query(query, [
        incomeExpense.value,
        incomeExpense.description,
        incomeExpense.income_expense_type_id,
        incomeExpense.id,
      ])

      const result: IncomeExpense = { ...rows[0] }
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  delete: async (id: number): Promise<IncomeExpense> => {
    try {
      const query = `
        UPDATE income_expense
        SET
          is_deleted = true,
          deleted_at = now()
        WHERE id=$1;
      `

      const { rows } = await db.query(query, [id])

      const result: IncomeExpense = { ...rows[0] }
      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
})

export default initializeIncomeExpenseModel
