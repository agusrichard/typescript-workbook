import { Pool } from 'pg'

export interface User {
  id?: number
  email?: string
  fullname?: string,
  password?: string,
  created_at?: Date,
  updated_at?: Date,
  is_deleted?: boolean,
  deleted_at?: Date,
  token?: string
}

export interface UsersModel {
  create: (user: User) => Promise<User>
  findById: (id: number) => Promise<User>
  findByEmail: (email: string) => Promise<User>
  clear: () => Promise<void>
}

type Initializer = (pool: Pool) => UsersModel

const initializeUsersModel: Initializer = (db: Pool): UsersModel => ({
  create: async (user: User): Promise<User> => {
    try {
      const query = `
        INSERT INTO users (
          email,
          password,
          fullname
        )
        VALUES (
          $1,
          $2,
          $3
        )
        RETURNING id;
      `
      const { rows } = await db.query(query, [user.email, user.password, user.fullname])
      const newUser: User = { ...rows[0] }
      return Promise.resolve(newUser)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  findById: async (id: number): Promise<User> => {
    try {
      const query = `
        SELECT * from users
        WHERE id = $1;
      `
      const { rows } = await db.query(query, [id])
      const newUser: User = { ...rows[0] }
      return Promise.resolve(newUser)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  findByEmail: async (email: string): Promise<User> => {
    try {
      const query = `
        SELECT * from users
        WHERE email = $1;
      `
      const { rows } = await db.query(query, [email])
      const newUser: User = { ...rows[0] }
      return Promise.resolve(newUser)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  clear: async (): Promise<void> => {
    try {
      await db.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE;;')
      await db.query('TRUNCATE TABLE income_expense_type RESTART IDENTITY CASCADE;')
      await db.query('TRUNCATE TABLE income_expense RESTART IDENTITY CASCADE;')
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
})

export default initializeUsersModel
