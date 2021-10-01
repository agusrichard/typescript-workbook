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
})

export default initializeIncomeExpenseModel
