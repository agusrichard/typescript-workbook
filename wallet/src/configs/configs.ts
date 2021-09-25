import dotenv from 'dotenv'
dotenv.config()

export type ConfigType = {
  DB_PORT: number
  DB_HOST: string
  DB_USER: string
  DB_PASSWORD: string
  DB_NAME: string,
  PORT: number,
  SECRET_KEY: string,
}

const Configs: ConfigType = {
    PORT: parseInt(process.env.PORT || '3000'),
    DB_PORT: parseInt(process.env.DB_PORT),
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_KEY: process.env.SECRET_KEY,
}

export default Configs