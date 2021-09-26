import { Pool } from 'pg'

export interface UsersModel {
  id?: number
  email?: string
  fullname?: string,
  password?: string,
  createdAt?: Date,
  updatedAt?: Date,
  isDeleted?: boolean,
  deletedAt?: Date
  register: (user: UsersModel) => Promise<UsersModel>
}

type Initializer = (pool: Pool) => UsersModel

const initializeUsersModel: Initializer = (db: Pool): UsersModel => ({
  register: async (user: UsersModel): Promise<UsersModel> => {
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
      const newUser: UsersModel = { ...rows[0] }
      return Promise.resolve(newUser)
    } catch (error) {
      return Promise.reject(error)
    }
  },
})

export default initializeUsersModel
