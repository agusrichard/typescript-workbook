import { createConnection, Connection } from 'mongoose'

import { ConfigType } from '../configs'

function createMongoDB(config: ConfigType): Connection | never {
  try {
    const uri = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_NAME}?retryWrites=true&w=majority`
    console.log('Connecting to MongoDB...')
    const result = createConnection(uri)
    console.log('Connected to MongoDB...')
    return result
  } catch (error) {
    console.log('Error connecting to database')
    throw error
  }
}

export default createMongoDB
