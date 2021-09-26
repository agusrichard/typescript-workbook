import { Pool } from 'pg'

import { ConfigType } from './configs'

const initializeDatabase = (configs: ConfigType) => new Pool({
  user: configs.DB_USER,
  host: configs.DB_HOST,
  database: configs.DB_NAME,
  password: configs.DB_PASSWORD,
  port: configs.DB_PORT,
})

export default initializeDatabase
