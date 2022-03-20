import express, { Request, Response } from 'express'
import { createConfigs, createMongoDB } from './configs'
import createAuthHandler from './handlers'
import createAuthService from './services'
import createMQPublisher from './publisher'
import createAuthRepository from './repositories'

const app = express()

const conf = createConfigs()
const db = createMongoDB(conf)
const publisher = createMQPublisher(conf)
const repo = createAuthRepository(db)
const service = createAuthService(repo, publisher)
const handler = createAuthHandler(service)

app.use('/auth', handler)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(conf.PORT, () => {
  console.log(`Server is listening on port ${conf.PORT}`)
})
