import { Pool } from 'pg'

export interface UsersModel {

}

type Initializer = (pool: Pool) => UsersModel

const initializeUsersModel: Initializer = (db: Pool): UsersModel => {
  return {

  }
}

export default initializeUsersModel