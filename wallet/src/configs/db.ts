import { Pool } from 'pg'

import Configs from './configs'

const pool: Pool = new Pool({
  user: Configs.DB_USER,
  host: Configs.DB_HOST,
  database: Configs.DB_NAME,
  password: Configs.DB_PASSWORD,
  port: Configs.DB_PORT,
})

export default pool