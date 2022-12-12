import morgan from 'morgan'
import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'

import configs from './configs'
import createUserService from './services'
import createAuthRouter from './routes'
import createMQConsumer from './consumer'
import createMQPublisher from './publisher'
import createUserRepository from './repositories'

const app = express()

const conf = configs.createConfigs()
const conn = configs.createMongoDB(conf)
const logger = configs.createLogger(__dirname)
const userRepo = createUserRepository(conn)
const publisher = createMQPublisher(conf)
const userService = createUserService(userRepo, publisher)
const consumer = createMQConsumer(conf, userService)
const authRouter = createAuthRouter(userService)

app.use(bodyParser.json())
app.use(morgan('combined', { stream: logger }))
app.use('/auth', authRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

consumer()

app.listen(conf.PORT, () => {
  console.log(`Server is running on port ${conf.PORT}`)
})
